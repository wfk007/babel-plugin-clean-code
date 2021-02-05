import test from "ava";
import { transformSync } from "@babel/core";
import cleanCode from "../src/index";

const code = `
var test1 = function test1() {
  return console.log("hello");
};
`;

test("return console", (t) => {
  t.plan(1);
  t.is(
    transformSync(code, {
      plugins: [cleanCode],
    })?.code,
    `var test1 = function test1() {\n  return;\n};`
  );
});
