import { Options, Variables } from "../types";
import * as utils from "../utils";
import debug from "./functions/debug";
import getCurrent from "./functions/getCurrent";
import increment from "./functions/increment";
import input from "./functions/input";
import move from "./functions/move";
import print from "./functions/print";

function header(vars: Variables, options: Options): string {
  
  // Start by creating some boilerplate
  // The temp var is appended after compilation if it was used
  let code = "";

  code += `
    // Intial variables
    var ${vars.board} = new Array(64).fill(0);
    var ${vars.cursor} = 0;

    ${getCurrent.code(vars, options)}
    ${debug.code(vars, options)}
    ${input.code(vars, options)}
    ${print.code(vars, options)}
    ${increment.code(vars, options)}
    ${move.code(vars, options)}

    // Code start
    `;

  return code;
}



export default header;
