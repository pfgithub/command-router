export default class Router<Info, Result> {
    handlers: Array<{
        path: string;
        requirements: ((info: Info) => boolean)[];
        handler: (cmd: string, info: Info, next: () => (Result | undefined)) => (Result | undefined);
    }>;
    constructor();
    add(path: string, requirements: ((info: Info) => boolean)[], handler: ((cmd: string, info: Info, next: () => (Result | undefined)) => (Result | undefined)) | Router<Info, Result>): void;
    add(requirements: (((info: Info) => boolean))[], handler: ((cmd: string, info: Info, next: () => (Result | undefined)) => (Result | undefined)) | Router<Info, Result>): void;
    handle(cmd: string, info: Info, next?: () => (Result | undefined)): undefined;
    _handleOne(cmd: string, info: Info, nextParentHandler: () => (Result | undefined), thisIndex: number): Result | undefined;
}
