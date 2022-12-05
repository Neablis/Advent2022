const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', 'inputs', 'day4');
puzzleInput = fs.readFileSync(filePath, { encoding: 'utf8' });

let formattedInput = puzzleInput.split('\n');

const contains = (shift1, shift2) => {
  const [start1, end1] = shift1.split("-");
  const [start2, end2] = shift2.split("-");

  if (parseInt(start1) <= parseInt(start2)) {
    if (parseInt(end1) >= parseInt(end2)) {
      return true
    }
  }

  if (parseInt(start2) <= parseInt(start1)) {
    if (parseInt(end2) >= parseInt(end1)) {
      return true
    }
  }
  return false;
}

const overlap = (shift1, shift2) => {
  const [start1, end1] = shift1.split("-");
  const [start2, end2] = shift2.split("-");

  if (parseInt(end1) >= parseInt(start2)) {
    if (parseInt(end2) >= parseInt(start1)) {
      return true
    }
  }

  if (parseInt(end2) >= parseInt(start1)) {
    if (parseInt(end1) >= parseInt(start2)) {
      return true
    }
  }

  return false;
}

const solvePart1 = (input) => {
  let shift = input[0];
  let totalContains = 0;
  input.forEach((shift) => {
    if (shift === "") return;
    let [first, second] = shift.split(",");
    // console.log({first,second})
    if(contains(first, second)) {
      totalContains += 1;
    }
  });

  return totalContains;
}

const solvePart2 = (input) => {
  let shift = input[0];
  let totalContains = 0;
  input.forEach((shift) => {
    if (shift === "") return;
    let [first, second] = shift.split(",");
    if(overlap(first, second)) {
      totalContains += 1;
    }
  });

  return totalContains;
}

const part1Answer = solvePart1(formattedInput);

const part2Answer = solvePart2(formattedInput);

console.log({part1Answer});
console.log({part2Answer});
