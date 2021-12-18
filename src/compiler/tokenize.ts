import { Token } from "./types";

/**
 * Generates a tokenized group to generalize statements
 */
function tokenize(code: string): Token[] {
  // This step will transform the brainfuck to an easier format to store
  // A collection of +/- or >/< can be squished together to form a single increment/decrement
  // This will generate a string where every token is separated with a space
  // The possible string tokens are:
  // (*number*) - A tile increment to execute
  // <*number*> - A cursor increment to execute
  // [ - right bracket
  // ] - left bracket
  // , - input
  // . - output
  // |*number*| set current cell to a value
  const quickSymbols = ("|0| " + code.replace(/[^+\-<>\[\]\.,#]|\s/gim, "")) // This steps generates a string that easier to work with
    .replace(/\[\-\]/g, "|0| ")
    .replace(/\|0\| \[.*/g, (substring) => { // Removes a loop after a set to zero since it's guaranteed to be skipped
      let bracketCount = 0;

      for(let i = 4; i < substring.length; i++) {
        if(substring[i] === "[") {
          bracketCount++;
        }

        if(substring[i] === "]") {
          bracketCount--;
        }
        
        if(bracketCount === 0) {
          return "|0| " + substring.substr(i + 1);
        }
      }

      throw new Error("Something wen't wrong with parsing")
    })
    .replace(/^(\|0\| )+/, "") // Since we pad the beginning with set to zero since it optimizes loops, we need to remove it afterwards
    .replace(/(\+|-)+/g, (substring) => {
      // find all sequenses of +-

      let ticker = substring
        .split("")
        .reduce((a, b) => a + (b === "+" ? 1 : -1), 0);

      return `(${ticker}) `;
    })
    .replace(/(<|>)+/g, (substring) => {
      // find all sequenses of <>

      let ticker = substring
        .split("")
        .reduce((a, b) => a + (b === ">" ? 1 : -1), 0);

      return `<${ticker}> `;
    })
    .replace(/(\[|\]|\.|,|#)/g, "$1 ")
    .trim();


  return quickSymbols
    .split(" ")
    .map((v): Token | null => {
      if (v.match(/^(\[|\]|\.|,)$/)) {
        return { type: v } as Token;
      }

      if(v === "#") {
        return { type: "debug" } as Token;
      }

      if (v.match(/^\(\-?\d+\)$/)) {
        const value = parseInt(v.replace(/^\((\-?\d+)\)$/, "$1"));

        if (value === 0) {
          return null;
        }

        return {
          type: "increment",
          value,
        } as Token;
      }

      if (v.match(/^\|\-?\d+\|$/)) {
        const value = parseInt(v.replace(/^\|(\-?\d+)\|$/, "$1"));

        return {
          type: "set",
          value,
        } as Token;
      }

      if (v.match(/^<\-?\d+>$/)) {
        const value = parseInt(v.replace(/^<(\-?\d+)>$/, "$1"));

        if (value === 0) {
          return null;
        }

        return {
          type: "move",
          value,
        } as Token;
      }

      throw new Error("Unrecognized token")
    })
    .filter((v): v is Token => !!v);
}

export default tokenize;
