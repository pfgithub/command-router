/*global describe it*/

const Router = require("../index.js");

// describe();

let r = { // an o inputs cmd,info and returns false, or true or newcmd. maybe make this also support reasoning.?
	pm: (expectedState) => (info) => {
		if(info.pm == expectedState) return true; //eslint-disable-line eqeqeq
		return info.error(`This command ${expectedState ? "can only": "cannot"} be used in a PM to the bot`) || false; 
	}
};

/*

ok what kinds of options are there supposed to be

o.path("help"), o.pm(false), o.perm.settings, o.perm("MANAGE_CHANNELS")
  ^^^^
one of these things is not like the other...
o.path is for pathing and routing in general, failure to path does not kill your route run
o.pm and o.perm are for checking if you have perms to a command, failure to have perms rips your route run and errors
^^^^^^^^^^^^^^^^^^^THIS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
i     won't    stand    for    this
but too bad I sit while programming


*/

// a router routes things


// Let's Try!

let router = new Router;

router.add([], (cmd, info, next) => {
	console.log("Handling cmd, ", cmd);
	next();
});

router.add("help", [r.pm(true)], (cmd, info) => {
	console.log("your help: ", cmd); // there will be no help router, help will be built by hand
});

router.add("donthelp", [r.pm(false)], (cmd, info) => {
	console.log("ok I won't help you: ", cmd);
});

let subrouter = new Router;
router.add("more commands", [], subrouter);

subrouter.add("show", [], (cmd, info) => {
	console.log("u got Shown: ", cmd);
});

router.add("more", [], (cmd, info) => {
	console.log("just more", cmd);
});

router.add([], (cmd, info, next) => {
	console.log("Cmd not found, ", cmd);
});

let info = {pm: false, error: (err) => console.log(err)};

router.handle("help me", info);
router.handle("donthelp please", info);
router.handle("help", info);
router.handle("donthelp", info);
router.handle("plshelp", info);
router.handle("whatifidonthelp", info);
router.handle("more commands show my text", info);
router.handle("more commands", info);
router.handle("more commands hmm", info);

/*

Example Usage;

let commandRouter = new Router;
let helpRouter = new Router;
commandRouter.add([o.command("help")], async (cmd, info, res) => {});
helpRouter.add([], async (cmd, info, res) => {})
commandRouter.use("me", require("./otherRouter"))


 */
