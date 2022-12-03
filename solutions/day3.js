const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', 'inputs', 'day3');
puzzleInput = fs.readFileSync(filePath, { encoding: 'utf8' });

let formattedInput = puzzleInput.split('\n');

// Create score lookup for uppercase
const upperCaseScores = [...Array(26)].map((_, index) => {
  const upperCaseACharCode = 65;

  return {
    char: String.fromCharCode(upperCaseACharCode + index),
    score: index + 27
  }
});

// Create score lookup for lowercase
const lowerCaseScores = [...Array(26)].map((_, index) => {
  const upperCaseACharCode = 97;

  return {
    char: String.fromCharCode(upperCaseACharCode + index),
    score: index + 1
  }
});

const scoreMap = {};

[...upperCaseScores, ...lowerCaseScores].forEach((score) => {
  scoreMap[score.char] = score.score;
})

let scoreResults = (matches = []) => {
  let total = 0;
  // let char = matches[0];

  matches.forEach((char) => {
    let score = scoreMap[char];

    total += score;
  });

  return total;
}

const solvePart1 = (input) => {
  let matches = [];
  input.forEach((knapsack) => {
    let match = null;
    let left = knapsack.slice(0, knapsack.length / 2).split("");
    let right = knapsack.slice(knapsack.length / 2).split("");

    const lookup = {};

    left.forEach((char) => lookup[char] = true);

    right.forEach((char) => lookup[char] ? (match = char) : false);

    if (match) matches.push(match);
  });

  return scoreResults(matches);
}

const solvePart2 = (input) => {
  let matches = [];

  for (let x = 0; x < input.length - 1; x += 3) {
    let [first, second, third] = input.slice(x,x+3);
    let match = null;



    const lookup = {};
    const secondPassLookup = {};
    first.split("").forEach((char) => lookup[char] = true);

    second.split("").forEach((char) => {
      if (lookup[char]) secondPassLookup[char] = true;
    });

    third.split("").forEach((char) => {
      if (secondPassLookup[char]) match = char;
    });

    if (match) matches.push(match);
  }

  return scoreResults(matches);
}

const part1Answer = solvePart1(formattedInput);

const part2Answer = solvePart2(formattedInput);

console.log({part1Answer});
console.log({part2Answer});
