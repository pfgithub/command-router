declare const _default: {
    new <Info, Result>(): {
        handlers: {
            path: string;
            requirements: ((info: Info) => boolean)[];
            handler: (cmd: string, info: Info, next: () => Result | undefined) => Result | undefined;
        }[];
        add(path: string, requirements: ((info: Info) => boolean)[], handler: any | ((cmd: string, info: Info, next: () => Result | undefined) => Result | undefined)): void;
        add(requirements: ((info: Info) => boolean)[], handler: any | ((cmd: string, info: Info, next: () => Result | undefined) => Result | undefined)): void;
        handle(cmd: string, info: Info, next?: () => Result | undefined): undefined;
        _handleOne(cmd: string, info: Info, nextParentHandler: () => Result | undefined, thisIndex: number): Result | undefined;
    };
};
export = _default;
