import { TraverseOptions } from "@babel/traverse";

const logLevel = ["log", "warn", "error", "info"] as const;

export interface IBabelPluginCleanCode {
  clearConsole: boolean;
  clearDebugger: boolean;
  consoleLevel: ReadonlyArray<typeof logLevel[number]>;
}

const getOpts = (opts: IBabelPluginCleanCode) => {
  const consoleLevel = opts.consoleLevel || logLevel;
  const clearConsole =
    opts.clearConsole === undefined ? true : !!opts.clearConsole;
  const clearDebugger =
    opts.clearDebugger === undefined ? true : !!opts.clearDebugger;
  return { consoleLevel, clearDebugger, clearConsole };
};

const cleanCode = () => {
  return {
    visitor: {
      CallExpression(path, { opts }: { opts: IBabelPluginCleanCode }) {
        const { consoleLevel, clearConsole } = getOpts(opts);
        if (
          clearConsole &&
          consoleLevel instanceof Array &&
          consoleLevel.length > 0
        ) {
          if (
            (path.node.callee as any).object &&
            (path.node.callee as any).object.name === "console" &&
            (path.node.callee as any).property &&
            consoleLevel.indexOf((path.node.callee as any).property.name) !==
              -1 &&
            (path.parent.type === "ArrowFunctionExpression" ||
              path.parent.type === "ReturnStatement")
          ) {
            path.remove();
          }
        }
      },
      ExpressionStatement(path, { opts }: { opts: IBabelPluginCleanCode }) {
        const { consoleLevel, clearConsole } = getOpts(opts);
        if (
          clearConsole &&
          consoleLevel instanceof Array &&
          consoleLevel.length > 0
        ) {
          if (
            path.node.expression.type === "CallExpression" &&
            (path.node.expression.callee as any).object &&
            (path.node.expression.callee as any).object.name === "console" &&
            (path.node.expression.callee as any).property &&
            consoleLevel.indexOf(
              (path.node.expression.callee as any).property.name
            ) !== -1
          ) {
            path.remove();
          }
        }
      },
      // 去除 debugger
      DebuggerStatement(path, { opts }: { opts: IBabelPluginCleanCode }) {
        const { clearDebugger } = getOpts(opts);
        if (clearDebugger) {
          path.remove();
        }
      },
    } as TraverseOptions,
  };
};

export default cleanCode;
