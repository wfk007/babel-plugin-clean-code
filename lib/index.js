"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var logLevel = ["log", "warn", "error", "info"];

var getOpts = function getOpts(opts) {
  var consoleLevel = opts.consoleLevel || logLevel;
  var clearConsole = opts.clearConsole === undefined ? true : !!opts.clearConsole;
  var clearDebugger = opts.clearDebugger === undefined ? true : !!opts.clearDebugger;
  return {
    consoleLevel: consoleLevel,
    clearDebugger: clearDebugger,
    clearConsole: clearConsole
  };
};

var cleanCode = function cleanCode() {
  return {
    visitor: {
      CallExpression: function CallExpression(path, _ref) {
        var opts = _ref.opts;

        var _getOpts = getOpts(opts),
            consoleLevel = _getOpts.consoleLevel,
            clearConsole = _getOpts.clearConsole;

        if (clearConsole && consoleLevel instanceof Array && consoleLevel.length > 0) {
          if (path.node.callee.object && path.node.callee.object.name === "console" && path.node.callee.property && consoleLevel.indexOf(path.node.callee.property.name) !== -1 && path.parent.type === "ArrowFunctionExpression") {
            path.remove();
          }
        }
      },
      ExpressionStatement: function ExpressionStatement(path, _ref2) {
        var opts = _ref2.opts;

        var _getOpts2 = getOpts(opts),
            consoleLevel = _getOpts2.consoleLevel,
            clearConsole = _getOpts2.clearConsole;

        if (clearConsole && consoleLevel instanceof Array && consoleLevel.length > 0) {
          if (path.node.expression.type === "CallExpression" && path.node.expression.callee.object && path.node.expression.callee.object.name === "console" && path.node.expression.callee.property && consoleLevel.indexOf(path.node.expression.callee.property.name) !== -1) {
            path.remove();
          }
        }
      },
      // 去除 debugger
      DebuggerStatement: function DebuggerStatement(path, _ref3) {
        var opts = _ref3.opts;

        var _getOpts3 = getOpts(opts),
            clearDebugger = _getOpts3.clearDebugger;

        if (clearDebugger) {
          path.remove();
        }
      }
    }
  };
};

var _default = cleanCode;
exports["default"] = _default;