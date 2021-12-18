export type Token =
  | {
      type: "." | "," | "[" | "]" | "debug";
    }
  | {
      type: "increment" | "move" | "set";
      value: number;
    };

export type Options = {
  compressed?: boolean;
  mode: "node";
  printMode: "ascii" | "number"
};

export type Variables = {
  board: string;
  cursor: string;
  funcs: {
    print: string,
    setCurrent: string,
    move: string,
    getCurrent: string,
    increment: string,
    input: string,
    debug: string
  }
};
