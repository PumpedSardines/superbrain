#! /usr/bin/env node
import * as fs from "fs/promises";
import * as path from "path";
import { compile } from "..";

const argv = process.argv.slice(2, process.argv.length);

if(argv.length === 0) {
    throw new Error("No file provided");
}

const location = path.resolve(process.cwd(), argv[0]);

(async () => {

    const data = await fs.readFile(location, "utf-8");
    
    const code = await compile(data, {
      mode: "node",
      compressed: true,
      printMode: "ascii"
    });

    const {name, dir} = path.parse(location);

    await fs.writeFile(
        path.resolve(
            dir, name + ".js"
        ),
        code
    );

    process.exit(0);
})();

