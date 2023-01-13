declare module "src/demo" {
    const str = "\u6D4B\u8BD5\u6587\u6848\n\u95EE\u95EE\n\u5927\u6CD5\nadfadfafasdfadsfadf \n\n\n";
    export default str;
}
declare module "src/index" { }
declare module "src/api/git" {
    export const hosts: () => Promise<string>;
}
declare module "src/api/index" {
    import * as git from "src/api/git";
    const _default: {
        git: typeof git;
    };
    export default _default;
}
declare module "src/util/logger" {
    import winston from "winston";
    interface ICreateLoggerOption {
        appName: string;
    }
    export const createLogger: (option: ICreateLoggerOption) => winston.Logger;
    const logger: winston.Logger;
    export default logger;
}
declare module "src/command/demo/_command/test" {
    const test: () => import("commander").Command;
    export default test;
}
declare module "src/command/demo/index" {
    const demo: () => import("commander").Command;
    export default demo;
}
declare module "src/util/index" {
    export const runLineCmd: (cwd?: string) => (cmd: string, showExecuteCmd?: boolean, showStdio?: boolean) => Promise<string>;
}
declare module "src/command/git/_command/pull" {
    const pull: () => import("commander").Command;
    export default pull;
}
declare module "src/command/git/_command/push" {
    const push: () => import("commander").Command;
    export default push;
}
declare module "src/command/git/_command/hosts" {
    const hosts: () => import("commander").Command;
    export default hosts;
}
declare module "src/command/git/index" {
    const git: () => import("commander").Command;
    export default git;
}
declare module "src/command/npm/_command/installGlobalTools" {
    const installGlobalTools: () => import("commander").Command;
    export default installGlobalTools;
}
declare module "src/command/npm/index" {
    const npm: () => import("commander").Command;
    export default npm;
}
declare module "src/command/template/_command/hello" {
    const hello: () => import("commander").Command;
    export default hello;
}
declare module "src/command/template/index" {
    const template: () => import("commander").Command;
    export default template;
}
//# sourceMappingURL=index.d.ts.map