import { Options, Variables } from "../../types";
import getCurrent from "./getCurrent";

function code(vars: Variables, options: Options) {
  if (options.printMode === "ascii") {
    return `var ${vars.funcs.print} = function () {
      process.stdout.write(
        String.fromCharCode(${getCurrent.call(vars, options)})
      );
    };`;
  } else {
    return `var ${vars.funcs.print} = function () {
      console.log(${getCurrent.call(vars, options)});
    };`;
  }
}

function call(vars: Variables, options: Options) {
  return `${vars.funcs.print}()`;
}

const print = {
  code,
  call
}

export default print;