const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../", "inputs", "day8");
puzzleInput = fs.readFileSync(filePath, { encoding: "utf8" });

// Utils
const buildBoard = (input) => {
  return input
    .trim()
    .split("\n")
    .map((row) => {
      return row
        .trim()
        .split("")
        .map((char) => parseInt(char));
    });
};

const expect = (input, expected, info = "") => {
  const forest = buildBoard(input);

  let results = solvePart1(input);

  if (results === expected) {
    console.log(`${info} SUCCESS ---------------------`);
  } else {
    console.log(`${info} Expected: ${expected} got ${results}-------------\n`);
    console.table(forest);
  }
};

// Tools
const isVisable = (x, y, forest) => {
  let visible = false;
  let treeHeight = forest[x][y];

  const conditional = false;

  const log = (conditional, val) =>
    conditional ? console.log("LOG:", { tree: treeHeight, ...val }) : null;

  // Check left
  let leftVisible = true;
  for (let left = x - 1; left >= 0; left--) {
    log(conditional, {
      dir: "LEFT",
      next: forest[left][y],
      left,
      hidden: forest[left][y] > treeHeight,
    });
    if (forest[left][y] >= treeHeight) {
      leftVisible = false;
      break;
    }
  }

  visible = leftVisible;

  // Check Right
  let rightVisible = true;
  for (let right = x + 1; right <= forest[x].length - 1; right++) {
    if (visible) break;

    log(conditional, {
      dir: "RIGHT",
      next: forest[right][y],
      right,
      hidden: forest[right][y] > treeHeight,
    });

    if (forest[right][y] >= treeHeight) {
      rightVisible = false;
      break;
    }
  }

  visible = rightVisible;

  // Check Up
  let upVisible = true;
  for (let up = y - 1; up >= 0; up--) {
    if (visible) break;

    log(conditional, {
      dir: "UP",
      next: forest[x][up],
      up,
      hidden: forest[x][up] > treeHeight,
    });

    if (forest[x][up] >= treeHeight) {
      upVisible = false;
      break;
    }
  }

  visible = upVisible;

  // Check Down
  let downVisible = true;
  for (let down = y + 1; down <= forest[x].length - 1; down++) {
    if (visible) break;

    log(conditional, {
      dir: "DOWN",
      next: forest[x][down],
      down,
      hidden: forest[x][down] > treeHeight,
    });

    if (forest[x][down] >= treeHeight) {
      downVisible = false;
      break;
    }
  }

  visible = downVisible;

  return visible;
};

const calcBeautyScore = (x, y, forest) => {
  let visible = new Array(3).fill(0);
  let treeHeight = forest[x][y];

  // Check left
  let leftVisible = 0;
  for (let left = x - 1; left >= 0; left--) {
    leftVisible += 1;

    if (forest[left][y] >= treeHeight) break;
  }

  visible[0] = leftVisible;

  // Check Right
  let rightVisible = 0;
  for (let right = x + 1; right <= forest[x].length - 1; right++) {
    rightVisible += 1;

    if (forest[right][y] >= treeHeight) break;
  }

  visible[1] = rightVisible;

  // Check Up
  let upVisible = 0;
  for (let up = y - 1; up >= 0; up--) {
    upVisible += 1;

    if (forest[x][up] >= treeHeight) break;
  }

  visible[2] = upVisible;

  // Check Down
  let downVisible = 0;
  for (let down = y + 1; down <= forest[x].length - 1; down++) {
    downVisible += 1;

    if (forest[x][down] >= treeHeight) break;
  }

  visible[3] = downVisible;

  return visible.reduce((partialSum, a) => partialSum * a, 1);
};

const solvePart1 = (input) => {
  const forest = buildBoard(input);
  let checkedForest = JSON.parse(JSON.stringify(forest));

  checkedForest = checkedForest.map((row) => row.fill(null));

  let visible = 0;
  for (let x = 0; x < forest.length; x++) {
    const row = forest[x];
    for (let y = 0; y < row.length; y++) {
      if (isVisable(x, y, forest, checkedForest)) {
        visible += 1;
        checkedForest[x][y] = 1;
      } else {
        checkedForest[x][y] = 0;
      }
    }
  }

  return visible;
};

const solvePart2 = (input) => {
  const forest = buildBoard(input);
  let largest = 0;

  let visible = 0;
  for (let x = 0; x < forest.length; x++) {
    const row = forest[x];
    for (let y = 0; y < row.length; y++) {
      let beautyScore = calcBeautyScore(x, y, forest);

      if (beautyScore > largest) {
        largest = beautyScore;
      }
    }
  }

  return largest;
};

const part1Answer = solvePart1(puzzleInput);

const part2Answer = solvePart2(puzzleInput);

console.log({ part1Answer });
console.log({ part2Answer });

// const first = `30373
// 25512
// 65332
// 33549
// 35390
// `;

// const second = `123
// 123
// 123
// 123
// 123
// `;

// const third = `555
// 515
// 555
// `;

// const cases = [
//   {
//     input: first,
//     output: 21,
//   },
//     {
//       input: second,
//       output: 15,
//     },
//     {
//       input: third,
//       output: 8,
//     },
// ];

// cases.forEach((field, idx) =>
//   expect(field.input, field.output, `Case ${idx} -`)
// );
