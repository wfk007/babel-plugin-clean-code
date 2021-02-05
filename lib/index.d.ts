import { TraverseOptions } from "@babel/traverse";
declare const logLevel: readonly ["log", "warn", "error", "info"];
export interface IBabelPluginCleanCode {
    clearConsole: boolean;
    clearDebugger: boolean;
    consoleLevel: ReadonlyArray<typeof logLevel[number]>;
}
declare const cleanCode: () => {
    visitor: TraverseOptions<import("@babel/types").Node>;
};
export default cleanCode;
