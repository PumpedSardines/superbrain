export function validator(code: string): boolean {
  let bracketCount = 0;

  for (const char of code.split("")) {
    if (char === "[") {
      bracketCount++;
    }

    if (char === "]") {
      if (bracketCount === 0) {
        return false;
      }
      bracketCount--;
    }
  }

  return bracketCount === 0;
}
