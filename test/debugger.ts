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

test("测试debugger", (t) => {
  t.plan(2);
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            clearDebugger: false,
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n  debugger;\n}\n\nnew Array(5).fill(0).map(_ => {});\ndebugger;`
  );
  t.is(
    transformSync(code, {
      plugins: [
        [
          cleanCode,
          {
            clearConsole: true,
            clearDebugger: true,
          },
        ],
      ],
    })?.code,
    `const fn = () => {\n  let a = \"hello\";\n};\n\nconst fn1 = () => {};\n\nif (true) {\n  const a = 1;\n}\n\nnew Array(5).fill(0).map(_ => {});`
  );
});
