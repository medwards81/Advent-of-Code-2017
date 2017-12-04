const fs = require('fs');
let valid = [];

const pfs = fs
  .readFileSync('d4a.txt')
  .toString()
  .trim()
  .split(/\n/);

pfs.forEach(pf => {
  pf.trim();
  if (pf.length) {
    //console.log(pf);
    const wds = pf.split(/\s+/);
    //console.log({ wds });
    let trkr = {};
    wds.forEach(wd => {
      //console.log(wd);
      if (trkr[wd]) trkr[wd]++;
      else trkr[wd] = 1;
    });
    console.log({ trkr });
    const dup = Object.keys(trkr).filter(wd => trkr[wd] > 1);
    console.log({ dup });
    if (!dup.length) valid.push(pf);
  }
});

//console.log({ valid });
console.log(valid.length);
