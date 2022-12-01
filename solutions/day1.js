const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../', 'inputs', 'day1');
puzzleInput = fs.readFileSync(filePath, { encoding: 'utf8' });

let formatted = puzzleInput.split('\n');
let elfs = [];

let current = [];
formatted.forEach((element) => {
   if (element === '') {
        elfs.push(current);
       current = [];
   } else {
        current.push(parseInt(element));
   }
});

let formattedElfs = elfs.map((items) => {
    let total = 0;
    items.forEach((item) => total += item);
    return {
        total,
        items
    }
});

elfs.push(current);

formattedElfs = formattedElfs.sort((elf1, elf2) => elf2.total - elf1.total)

// Part 1
console.log(formattedElfs[0]);

// Part 2
console.log(formattedElfs[0].total + formattedElfs[1].total + formattedElfs[2].total)
