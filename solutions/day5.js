const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', 'inputs', 'day5');
puzzleInput = fs.readFileSync(filePath, { encoding: 'utf8' });

let formatted = puzzleInput.split('\n');

const cargoPart1 = [
    "DTRBJLWG",
    "SWC",
    "RZTM",
    "DTCHSPV",
    "GPTLDZ",
    "FBRZJQCD",
    "SBDJMFTR",
    "LHRBTVM",
    "QPDSV"
].map(c => c.split(''))

const cargoPart2 = JSON.parse(JSON.stringify(cargoPart1));


const moveN = (from, to, n, crates, ordered=true) => {
  const offsetFrom = from - 1;
  const offsetTo = to - 1;

  let movedCrates = crates[offsetFrom].splice(-n);

  if (ordered) {
    movedCrates = movedCrates.reverse();
  }

  crates[offsetTo].push(...movedCrates);
}


const solvePart1 = (input) => {
  let row = input[0];

  input.forEach((row) => {
    if (row === "") return;
    const [_1, number, _2, from, _3, to] = row.split(" ");
    moveN(from, to, number, cargoPart1);
  });

  return cargoPart1.map((row) => row[row.length - 1]).join("")
}

const solvePart2 = (input) => {
  let row = input[0];

  input.forEach((row) => {
    if (row === "") return;
    const [_1, number, _2, from, _3, to] = row.split(" ");
    moveN(from, to, number, cargoPart2, false);
  });

  return cargoPart2.map((row) => row[row.length - 1]).join("")
}

const part1Answer = solvePart1(formatted);

const part2Answer = solvePart2(formatted);

console.log({part1Answer});
console.log({part2Answer});
