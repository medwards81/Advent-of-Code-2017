const fs = require('fs');

let banksStrArr = fs
  .readFileSync('d6a.txt')
  .toString()
  .trim()
  .split(/\s+/);
//banksStrArr = ['0', '2', '7', '0'];
const banks = banksStrArr.map(bank => parseInt(bank));

console.log({ banks });

const findMax = ele => ele === curMax;

const maxIdx = banks.length - 1;
let curMax, curMaxIdx, nextBankIdx;

let prevConfFound = false;
let redistributions = {};
let maxIter = 999999;
let counter = 0;
let redistributionKey;

while (!prevConfFound) {
  counter++;
  curMax = Math.max(...banks);
  curMaxIdx = banks.findIndex(findMax);
  banks[curMaxIdx] = 0;
  nextBankIdx = curMaxIdx + 1;
  while (curMax > 0) {
    if (nextBankIdx > maxIdx) nextBankIdx = 0;
    banks[nextBankIdx]++;
    nextBankIdx++;
    curMax--;
  }
  console.log('redis', counter, ':', banks);
  redistributionKey = banks.join('');
  if (redistributions[redistributionKey]) {
    console.log(
      'found duplicate distribution',
      banks,
      'after',
      counter,
      'redistributions and ',
      counter - redistributions[redistributionKey],
      'cycles'
    );
    prevConfFound = true;
  }
  redistributions[redistributionKey] = counter;
  if (counter >= maxIter) {
    console.log('oops... something must be wrong. Aborting search.');
    prevConfFound = true;
  }
}

//console.log({ redistributions });
