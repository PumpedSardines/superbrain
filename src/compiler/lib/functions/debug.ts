import { Options, Variables } from "../../types";
import getCurrent from "./getCurrent";

function code(vars: Variables, options: Options) {
  return `var ${vars.funcs.debug} = function () {
      console.log(${vars.board});
      console.log(${vars.cursor});
    };`;
}

function call(vars: Variables, options: Options) {
  return `${vars.funcs.debug}()`;
}

const debug = {
  code,
  call,
};

export default debug;
