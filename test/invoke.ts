import test from "ava";
import { transformSync } from "@babel/core";
import cleanCode from "../src/index";

const code = `
const test1 = () => console.log("hello");
test1();
function test2() {
  const name = "wfk";
  console.log(name);
}
test2();
`;

test("测试函数调用", (t) => {
  t.plan(1);
  t.is(
    transformSync(code, {
      plugins: [cleanCode],
    })?.code,
    `const test1 = () => {};\n\ntest1();\n\nfunction test2() {\n  const name = \"wfk\";\n}\n\ntest2();`
  );
});
