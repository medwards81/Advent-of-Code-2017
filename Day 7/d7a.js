const fs = require('fs');
let valid = [];

const programs = fs
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(/\n/);

let programsFound = [];

programs.forEach(program => {
  program.trim();
  const tmpArr = program.split('->');
  console.log({ tmpArr });
  const baseProgram = tmpArr[0].split(/\s+/)[0].trim();
  programsFound.push(baseProgram);
  if (tmpArr.length > 1) {
    const childProgramsStr = tmpArr[1]
      .replace(/\s+/g, '')
      .replace(/\r|\n/g, '');
    const childPrograms = childProgramsStr.split(',');
    //console.log({ childPrograms });
    programsFound.push(...childPrograms);
  }
  //console.log({ programsFound });
});

let tracker = {};
programsFound.forEach(program => {
  if (tracker[program]) tracker[program]++;
  else tracker[program] = 1;
});

const countOne = Object.keys(tracker).filter(program => tracker[program] === 1);
console.log({ tracker, countOne });
//console.log(valid.length);
