import { Options, Variables } from "../../types";

function code(vars: Variables, options: Options) {
  return `
    var ${vars.funcs.move} = function (v) {
      ${vars.cursor} += v;

      while(${vars.cursor} >= ${vars.board}.length) {
        ${vars.board} = ${vars.board}.concat(new Array(64).fill(0));
      }

    };`;
}

function call(value: number, vars: Variables, options: Options) {
  return `${vars.funcs.move}(${value})`;
}

const move = {
  code,
  call,
};

export default move;
