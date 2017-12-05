const fs = require('fs');
let valid = [];

let instrs = fs
  .readFileSync('d5a.txt')
  .toString()
  .trim()
  .split(/\n/);
//instrs = [0, 3, 0, 1, -3];

console.log('instrs len:', instrs.length);

let insideList = true;
let currentIdx = 0;
let currentIstr;
let steps = 0;

while (insideList) {
  currentIstr = getInstr(currentIdx);
  if (currentIstr === undefined || currentIdx < 0) insideList = false;
  else {
    if (currentIstr === 0) {
      instrs[currentIdx] = 1;
      currentIstr = 1;
      steps++;
    }

    if (currentIstr >= 3) instrs[currentIdx]--;
    else instrs[currentIdx]++;

    currentIdx += currentIstr;
    steps++;
  }
}

console.log({ steps });

function getInstr(idx) {
  let instr = instrs[idx];
  if (instr !== undefined) instr = parseInt(instr);
  else {
    console.log('invalid instr at idx', idx, instr, 'current step:', steps);
  }
  return instr;
}
