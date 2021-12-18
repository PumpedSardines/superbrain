import tokenize from "./tokenize";
import * as prettier from "prettier";
import { Options, Variables } from "./types";
import * as utils from "./utils";
import { validator } from "./validator";
import header from "./lib/header";
import uglify from "uglify-js";
import increment from "./lib/functions/increment";
import print from "./lib/functions/print";
import move from "./lib/functions/move";
import input from "./lib/functions/input";
import getCurrent from "./lib/functions/getCurrent";
import setCurrent from "./lib/functions/setCurrent";
import debug from "./lib/functions/debug";

export async function compile(code: string, options: Options) {
  if (!validator(code)) {
    throw new Error("Code has a problem");
  }

  // Variable names to use in the program
  const vars: Variables = {
    board: utils.compressed(options) ? "b" : `board`,
    cursor: utils.compressed(options) ? "c" : `cursor`,
    funcs: {
      print: utils.compressed(options) ? "p" : `print`,
      setCurrent: utils.compressed(options) ? "s" : `setCurrent`,
      move: utils.compressed(options) ? "m" : `move`,
      input: utils.compressed(options) ? "i" : `input`,
      increment: utils.compressed(options) ? "a" : `increment`,
      getCurrent: utils.compressed(options) ? "g" : `getCurrent`,
      debug: utils.compressed(options) ? "d" : `debug`,
    },
  };

  let js = "";

  js += `(async function (){`;

  js += header(vars, options);

  const tokens = tokenize(code);

  Number(Buffer.from([])[0]);

  js += tokens
    .map((v) => {
      switch (v.type) {
        case "[":
          return `while(${getCurrent.call(vars, options)}){`;

        case "]":
          return "}";

        case ".":
          return print.call(vars, options) + ";";

        case "debug":
          return debug.call(vars, options) + ";";

        case "increment":
          return increment.call(v.value, vars, options) + ";";

        case "move":
          return move.call(v.value, vars, options) + ";";

        case "set":
          return setCurrent.call(v.value, vars, options) + ";";
          
        case ",":
          return input.call(vars, options) + ";";
      }
    }) // Get js version of every token
    .join("");

  js += `process.stdout.write("\\n");`;
  js += "process.stdin.pause();";
  js += `})();`;

  // Run prettier if it shouldn't be compressed
  if (options.compressed) {
    return uglify.minify(js).code;
  } else {
    return prettier.format(js);
  }
};

