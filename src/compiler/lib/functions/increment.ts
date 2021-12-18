import { Options, Variables } from "../../types";
import getCurrent from "./getCurrent";
import setCurrent from "./setCurrent";

function code(vars: Variables, options: Options) {
  const current = `${vars.board}[${vars.cursor}]`;

  return `
    var ${vars.funcs.increment} = function (v) {
      if(v < 0) {
        ${setCurrent.call(
          "(v % 256) + " + getCurrent.call(vars, options),
          vars,
          options
        )};
        if(${current} < 0) {
          ${setCurrent.call(
            "256 + " + getCurrent.call(vars, options),
            vars,
            options
          )};
        }
      } else {
        ${setCurrent.call(
          "(v + " + getCurrent.call(vars, options) + ") % 256",
          vars,
          options
        )};
      }
    };`;
}

function call(value: number, vars: Variables, options: Options) {
  return `${vars.funcs.increment}(${value})`;
}

const increment = {
  code,
  call,
};

export default increment;
