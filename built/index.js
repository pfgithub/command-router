"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deleteFirstInsensitive(str, replace) {
    if (str.toLowerCase().startsWith(replace.toLowerCase())) {
        return str.substr(replace.length);
    }
    return str;
}
class Router {
    constructor() {
        this.handlers = [];
    }
    add(pathOrReqs, requirementsOrHandler, handlerArg) {
        // figure out which arguments go where
        let path;
        let requirements;
        let handler;
        if (typeof pathOrReqs === "string") {
            path = pathOrReqs;
            // the force casts shouldn't be required, typescript should know
            requirements = requirementsOrHandler;
            handler = handlerArg;
        }
        else {
            path = "";
            handler = requirementsOrHandler;
            requirements = pathOrReqs;
        }
        // if the handler is a router, make it call its handle command instead of calling it
        // handlers don't extend from function // maybe they should
        if (handler instanceof Router) {
            // set the origin handler so we don't recursively call ourselves in the future
            const originHandler = handler;
            handler = (...args) => originHandler.handle(...args);
        }
        // push the new handler to the end of the handler list
        this.handlers.push({ path: path, requirements: requirements, handler: handler });
    }
    // handles a certain command with the given info
    handle(cmd, info, next = () => undefined) {
        // loop through each handler and call them
        this._handleOne(cmd, info, next, 0);
        return undefined;
    }
    _handleOne(cmd, info, nextParentHandler, thisIndex) {
        // If we've tried all our handlers and none succeeded, go onto the next parent handler
        if (thisIndex > this.handlers.length - 1) {
            return nextParentHandler();
        }
        // Get the handler we will be trying to use
        const ourHandler = this.handlers[thisIndex];
        // get the function that will be called after our handleone
        const next = () => this._handleOne(cmd, info, nextParentHandler, thisIndex + 1);
        // check that we're on the right path to be run
        cmd = cmd.trim();
        // ensure we are on that path
        // if not, run the nextThisHandler
        if (!cmd.toLowerCase().startsWith(ourHandler.path.toLowerCase())) {
            return next();
        }
        // if we are, replace the cmd for our current handler if it gets run
        const handlerCommand = deleteFirstInsensitive(cmd, ourHandler.path).trim();
        // Loop over the requirements, ensuring they all pass
        // if one fails, it will call info.error which propegates way up the chain
        // it will also return false so the every fails
        const requirementsPass = ourHandler.requirements.every(requirement => requirement(info));
        // if the requirements don't pass, we are done
        // the requirement already called error, we can just stop propagation
        if (!requirementsPass) {
            return;
        }
        // all the requirements pass now so it's time to call the handler
        // it will be called with local next rather than global next because
        // local next becomes global if we run out of things to try
        return ourHandler.handler(handlerCommand, info, next);
    }
}
exports.default = Router;
