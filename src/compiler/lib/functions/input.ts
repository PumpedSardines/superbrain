import { Options, Variables } from "../../types";
import setCurrent from "./setCurrent";

function code(vars: Variables, options: Options) {
  return `var ${vars.funcs.input} = function () {
    process.stdin.setRawMode(true);

    return new Promise(resolve => process.stdin.once('data', v => {
      ${setCurrent.call("Number(v[0])", vars, options)};
      process.stdin.setRawMode(false);
      resolve();
    }));
  };`;
}

function call(vars: Variables, options: Options) {
  return `await ${vars.funcs.input}()`;
}

const input = {
  code,
  call,
};

export default input;
