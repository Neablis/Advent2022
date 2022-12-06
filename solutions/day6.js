const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", "inputs", "day6");
puzzleInput = fs.readFileSync(filePath, { encoding: "utf8" });

const hasRepeats = (str) => {
  return /(.).*\1/.test(str);
};

const solve = (input, inputLength) => {
  for (let x = 0; x < input.length - 1; x++) {
    const str = input.slice(x, x + inputLength);

    if (!hasRepeats(str)) {
      return x + inputLength;
    }
  }
};

const part1Answer = solve(puzzleInput, 4);

const part2Answer = solve(puzzleInput, 14);

console.log({ part1Answer });
console.log({ part2Answer });
