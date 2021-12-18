import { Options, Variables } from "../../types";

function code(vars: Variables, options: Options) {
  const current = `${vars.board}[${vars.cursor}]`;

  return ``;
}

function call(value: number | string, vars: Variables, options: Options) {
  return `${vars.board}[${vars.cursor}] = ${value}`;
}

const setCurrent = {
  code,
  call,
};

export default setCurrent;
