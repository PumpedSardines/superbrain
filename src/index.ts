import compile from "./compiler/compile";
import * as fs from "fs/promises";
import { minify } from "./compiler/minify";

(async () => {
  const raw = await fs.readFile("hangman.bf", "utf-8");
  const output = await compile(raw, {
    compressed: true,
    mode: "node",
    printMode: "ascii",
  });
  await fs.writeFile("hangman.js", output);
})();

/*(async () => {
  const raw = await fs.readFile("readline.bf", "utf-8");
  const output = minify(raw, false);
  await fs.writeFile("readline.minify.bf", output);
})();*/