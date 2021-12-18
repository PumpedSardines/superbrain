#! /usr/bin/env node
import * as fs from "fs/promises";
import * as path from "path";
import { minify } from "..";

const argv = process.argv.slice(2, process.argv.length);

if(argv.length === 0) {
    throw new Error("No file provided");
}

const location = path.resolve(process.cwd(), argv[0]);

(async () => {

    const data = await fs.readFile(location, "utf-8");
    
    const minifiedCode = minify(data);

    const {ext, name, dir} = path.parse(location);

    await fs.writeFile(
        path.resolve(
            dir, name + ".minified" + ext
        ),
        minifiedCode
    );

    process.exit(0);
})();

