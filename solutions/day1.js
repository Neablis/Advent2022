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

const formattedElfs = elfs.map((items) => {
    let total = 0;
    items.forEach((item) => total += item);
    return {
        total,
        items
    }
});

elfs.push(current);

let most = {
    amount: 0,
    index: 0
}

formattedElfs.forEach((elf, idx) => {
   if (elf.total >= most.amount) {
      let newMost = {
          amount: elf.total,
          index: idx
      }

      most = newMost;
   }
});

console.log({most})
