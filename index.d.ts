// Type definitions for commandrouter

export function myMethod(a: string): string;
export function myOtherMethod(a: number): number;

export = Router;

/*~ Write your module's methods and properties in this class */
declare class Router {
    constructor();

    add(path: string, requirements: any[], next: any): void;
    add(requirements: any[], next: any): void;
    handle(cmd: string, info: object, next?: any);
}