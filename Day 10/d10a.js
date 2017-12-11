const fs = require('fs');

const instrs = fs
  .readFileSync('input_test.txt')
  .toString()
  .trim();
