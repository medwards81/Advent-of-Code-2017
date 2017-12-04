const fs = require('fs');
let valid = [];

const pfs = fs
  .readFileSync('d4a.txt')
  .toString()
  .trim()
  .split(/\n/);

let validPfs = [],
  invalidPfs = [];
pfs.forEach(pf => {
  pf.trim();
  if (pf.length) {
    //console.log(pf);
    const wds = pf.split(/\s+/);
    //console.log({ wds });
    let isValidPf = true;
    let invalidPairs = [];
    wds.forEach((wd, idx) => {
      //console.log(wd);
      let wdsFilter = [...wds];
      wdsFilter.splice(idx, 1);
      //console.log({ wds, wdsFilter });
      wdsFilter.forEach(w => {
        if (isAnagram(wd, w)) {
          isValidPf = false;
          invalidPairs.push([wd, w]);
        }
      });
    });
    //console.log({ isValidPf, invalidPairs });
    if (isValidPf) validPfs.push(pf);
    else invalidPfs.push(pf);
  }
});
const validPfLen = validPfs.length;
const invalidPfLen = invalidPfs.length;
console.log({ validPfs, validPfLen, invalidPfs, invalidPfLen });

//console.log({ valid });
console.log(valid.length);

// https://codereview.stackexchange.com/questions/99247/determining-if-two-words-are-anagrams
function isAnagram(word1, word2) {
  if (typeof word1 !== 'string' || typeof word2 !== 'string') {
    throw new Error('isAnagram requires two strings to be passed.');
  }

  var normalizedWord1 = word1.replace(/[^A-Za-z]+/g, '').toLowerCase();
  var normalizedWord2 = word2.replace(/[^A-Za-z]+/g, '').toLowerCase();

  var counts = [];
  var word1Length = normalizedWord1.length;
  var word2Length = normalizedWord2.length;

  if (word1Length !== word2Length) {
    return false;
  }

  for (var i = 0; i < word1Length; i++) {
    var index = normalizedWord1.charCodeAt(i) - 97;
    counts[index] = (counts[index] || 0) + 1;
  }

  for (var i = 0; i < word2Length; i++) {
    var index = normalizedWord2.charCodeAt(i) - 97;
    if (!counts[index]) {
      return false;
    } else {
      counts[index]--;
    }
  }

  return true;
}
