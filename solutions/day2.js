const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", "inputs", "day2");
puzzleInput = fs.readFileSync(filePath, { encoding: "utf8" });

const objectFlip = (obj) => {
  const flippedObject = Object.entries(obj).reduce((ret, entry) => {
    const [key, value] = entry;
    ret[value] = key;
    return ret;
  }, {});

  return { ...obj, ...flippedObject };
};

let INPUTS = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

INPUTS = objectFlip(INPUTS);

let OUTPUTS = {
  ROCK: "X",
  PAPER: "Y",
  SCISSORS: "Z",
};

OUTPUTS = objectFlip(OUTPUTS);

let PART2_OUTPUTS = {
  LOSE: "X",
  TIE: "Y",
  WIN: "Z",
};

PART2_OUTPUTS = objectFlip(PART2_OUTPUTS);

const SCORES = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
};

const WINS = {
  LOSE: 0,
  TIE: 3,
  WIN: 6,
};

const PLAYS = {
  ROCK: {
    SCISSORS: "WIN",
    PAPER: "LOSE",
    ROCK: "TIE",
  },
  SCISSORS: {
    SCISSORS: "TIE",
    PAPER: "WIN",
    ROCK: "LOSE",
  },
  PAPER: {
    SCISSORS: "LOSE",
    PAPER: "TIE",
    ROCK: "WIN",
  },
};

const PLAYS_RESULTS = {
  ROCK: {
    LOSE: "SCISSORS",
    WIN: "PAPER",
    TIE: "ROCK",
  },
  SCISSORS: {
    LOSE: "PAPER",
    WIN: "ROCK",
    TIE: "SCISSORS",
  },
  PAPER: {
    LOSE: "ROCK",
    WIN: "SCISSORS",
    TIE: "PAPER",
  },
};

const scoreRound = (play, result) => {
  return SCORES[play] + WINS[result];
};

const roundResult = (player, opponent, matrix) => {
  return matrix[player][opponent];
};

const playGame = (plays, part2) => {
  let totalScore = 0;
  //   const round = plays[0];
  plays.forEach((round) => {
    let [opponetMove, myMove] = round.split(" ");

    opponetMove = INPUTS[opponetMove];
    myMove = OUTPUTS[myMove];

    const winner = roundResult(myMove, opponetMove, PLAYS);

    const score = scoreRound(myMove, winner);

    totalScore += score;
  });

  return totalScore;
};

const playGamePart2 = (plays, part2) => {
  let totalScore = 0;
  plays.forEach((round) => {
    let [opponetMove, result] = round.split(" ");

    opponetMove = INPUTS[opponetMove];
    result = PART2_OUTPUTS[result];

    const myMove = roundResult(opponetMove, result, PLAYS_RESULTS);

    const score = scoreRound(myMove, result);

    totalScore += score;
  });

  return totalScore;
};

// Part 1
const myScore = playGame(puzzleInput.split("\n"));

console.log({ part1: myScore });

// Part 2
const correctScore = playGamePart2(puzzleInput.split("\n"));

console.log({ part2: correctScore });
