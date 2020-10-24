import { parseHTML } from "./parse";
import { generate } from "./generate";

export function compileToFunctions(template) {
    let ast = parseHTML(template);
    console.log(ast);
    let code = generate(ast); //生成代码
    console.log(code)
  }
  