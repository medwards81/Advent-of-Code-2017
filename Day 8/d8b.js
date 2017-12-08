const fs = require('fs');

const instrs = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(/\n/);

let tracker = {};

// b inc 5 if a > 1
// a inc 1 if b < 5
// c dec -10 if a >= 1
// c inc -20 if c == 10

const opMap = {
  inc: '+=',
  dec: '-='
};

let procVals = [];
instrs.forEach(instr => {
  instr.trim();
  //console.log(instr);
  let [reg1, op, val, , reg2, comp, reg2val] = instr.split(/\s+/);
  //console.log({ reg1, op, val, reg2, comp, reg2val });
  //console.log(tracker[reg1]);
  if (!(reg1 in tracker)) tracker[reg1] = 0;
  if (!(reg2 in tracker)) tracker[reg2] = 0;
  const evalScript = `if (tracker["${reg2}"] ${comp} ${reg2val}) { tracker["${reg1}"] ${opMap[
    op
  ]} ${val}; procVals.push(tracker["${reg1}"]); }`;
  //console.log({ evalScript });
  eval(evalScript);
});

//console.log({ tracker });
let vals = [];
for (register in tracker) {
  vals.push(tracker[register]);
}

const highestVal = Math.max(...vals);
const highestValProc = Math.max(...procVals);

console.log({ highestVal, highestValProc });
