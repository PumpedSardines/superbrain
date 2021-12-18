import { Options, Variables } from "../../types";

function code(vars: Variables, options: Options) {
  return ``;
}

function call(vars: Variables, options: Options) {
  return `${vars.board}[${vars.cursor}]`;
}

const getCurrent = {
  code,
  call,
};

export default getCurrent;
