const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", "inputs", "day7");
puzzleInput = fs.readFileSync(filePath, { encoding: "utf8" });

const makeFS = (input) => {
  return input
    .split("\n")
    .concat("$ cd /")
    .map((line) => line.split(" "))
    .filter(([, cmd]) => cmd !== "ls")
    .reduce(
      (cwd, [args0, args1, args2]) => {
        switch (args0) {
          case "$":
            switch (args2) {
              case "..":
                cwd.shift();
                break;
              case "/":
                cwd = cwd.slice(-1);
                break;
              default:
                cwd.unshift(cwd[0][args2]);
            }
            break;
          default:
            cwd[0][args1] = cwd[0][args1] || Number(args0) || {};
        }
        return cwd;
      },
      [{}]
    )[0];
};

const sumdirs = (dir, dirs = []) => {
  return Object.values(dir).reduce(
    ([sum, dirs], v) => {
      if (typeof v === "object") {
        const [acc, d] = sumdirs(v);
        return [sum + acc, dirs.concat([acc, d])];
      }
      return [sum + v, dirs];
    },
    [0, dirs]
  );
};

const getDirSizes = (input) => sumdirs(makeFS(input)).flat(Infinity);

const solvePart1 = (input) => {
  return getDirSizes(input)
    .filter((sz) => sz <= 100000)
    .reduce((sum, v) => sum + v);
};

const solvePart2 = (input) => {
  return getDirSizes(input)
    .filter((sz, _, arr) => sz >= 30000000 - 70000000 + arr[0])
    .reduce((min, v) => (min < v ? min : v));
};

const part1Answer = solvePart1(puzzleInput);

const part2Answer = solvePart2(puzzleInput);

console.log({ part1Answer });
console.log({ part2Answer });
