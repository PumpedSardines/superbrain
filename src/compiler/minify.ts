export function minify(code: string, hard = true): string {
  return ("[-]" + code)
    .replace(/[^+\-<>\[\]\.,]|\s/gim, "")
    .replace(/(\[-\])+/, "[-]")
    .replace(/\[-\]\[.*/g, (substring) => {
      // Removes a loop after a set to zero since it's guaranteed to be skipped
      let bracketCount = 0;

      for (let i = 3; i < substring.length; i++) {
        if (substring[i] === "[") {
          bracketCount++;
        }

        if (substring[i] === "]") {
          bracketCount--;
        }

        if (bracketCount === 0) {
          return "[-]" + substring.substr(i + 1);
        }
      }

      throw new Error("Something wen't wrong with parsing");
    })
    .replace(/^(\[-\])/, () => {
      if(hard) {
        return "";
      } else {
        return "[-]";
      }
    })
    .replace(/(\+|-)+/g, (substring) => {
      let ticker = substring
        .split("")
        .reduce((a, b) => a + (b === "+" ? 1 : -1), 0);

      if(ticker === 0) {
        return "";
      } 

      return ticker > 0
        ? String("+").repeat(ticker)
        : String("-").repeat(Math.abs(ticker));
    })
    .replace(/(<|>)+/g, (substring) => {
      let ticker = substring
        .split("")
        .reduce((a, b) => a + (b === ">" ? 1 : -1), 0);

      if(ticker === 0) {
        return "";
      } 

      return ticker > 0
        ? String(">").repeat(ticker)
        : String("<").repeat(Math.abs(ticker));
    });
}
