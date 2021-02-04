import test from "ava";
import { transformSync } from "@babel/core";
import cleanCode from "../src/index";

const code = `
const fn = () => {
  let a = "hello"
  console.log("log");
  console.error("error")
  console.warn("error")
  console.info("error")
};
const fn1 = () => console.log("log");
if (true) {
  const a = 1;
  console.log("log");
  console.error("error")
  console.warn("error")
  console.info("error")
  debugger
}
new Array(5).fill(0).map(_=>console.log("123"))
debugger
console.log("log");
console.error("error")
console.warn("error")
console.info("error")
`;

test("测试console", (t) => {
  t.plan(6);
  t.is(
    transformSync(code, {
      plugins: [[cleanCode]],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n}\n\nnew Array(5).fill(0).map(_ => {});`
  );
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            consoleLevel: ["log"],
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n  console.error(\"error\");\n  console.warn(\"error\");\n  console.info(\"error\");\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n  console.error(\"error\");\n  console.warn(\"error\");\n  console.info(\"error\");\n}\n\nnew Array(5).fill(0).map(_ => {});\nconsole.error(\"error\");\nconsole.warn(\"error\");\nconsole.info(\"error\");`
  );
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            consoleLevel: ["log", "error"],
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n  console.warn(\"error\");\n  console.info(\"error\");\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n  console.warn(\"error\");\n  console.info(\"error\");\n}\n\nnew Array(5).fill(0).map(_ => {});\nconsole.warn(\"error\");\nconsole.info(\"error\");`
  );
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            consoleLevel: ["log", "error", "info"],
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n  console.warn(\"error\");\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n  console.warn(\"error\");\n}\n\nnew Array(5).fill(0).map(_ => {});\nconsole.warn(\"error\");`
  );
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            consoleLevel: ["log", "error", "info", "warn"],
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n}\n\nnew Array(5).fill(0).map(_ => {});`
  );
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            consoleLevel: ["test"],
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n  console.log(\"log\");\n  console.error(\"error\");\n  console.warn(\"error\");\n  console.info(\"error\");\n};\n\nconst fn1 = () => console.log(\"log\");\n\nif (true) {\n  const a = 1;\n  console.log(\"log\");\n  console.error(\"error\");\n  console.warn(\"error\");\n  console.info(\"error\");\n}\n\nnew Array(5).fill(0).map(_ => console.log(\"123\"));\nconsole.log(\"log\");\nconsole.error(\"error\");\nconsole.warn(\"error\");\nconsole.info(\"error\");`
  );
});
