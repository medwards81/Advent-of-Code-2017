// == PART 1 ==

function part1(input) {
  let programs = input.split('\n').map(line => {
    let [, name, namesAbove] = line.match(
      /(\w+) \(\d+\)(?: -> ((?:\w+(?:$|, ))+))?/
    );
    return {
      name,
      namesAbove: namesAbove ? namesAbove.split(', ') : []
    };
  });

  let namesBelow = programs.map(({ name }) => name);
  let namesAbove = programs.reduce(
    (names, program) => [...names, ...program.namesAbove],
    []
  );

  return namesBelow.find(name => namesAbove.indexOf(name) < 0);
}

// == PART 2 ==

function part2(input) {
  // Parse input
  let programs = input.split('\n').map(line => {
    let [, name, weight, namesAbove] = line
      .trim()
      .match(/(\w+) \((\d+)\)(?: -> ((?:\w+(?:$|, ))+))?/);
    return {
      name,
      weight: +weight,
      namesAbove: namesAbove ? namesAbove.split(', ') : []
    };
  });

  // Get programs above references for corresponding program below
  programs.forEach(
    program =>
      (program.programsAbove = program.namesAbove.map(name =>
        programs.find(program => program.name === name)
      ))
  );

  // Calculate total weight of each program in a non-recursive way
  for (
    let programsWithoutTotalWeight = programs;
    programsWithoutTotalWeight.length > 0;

  ) {
    programsWithoutTotalWeight = programsWithoutTotalWeight.filter(program => {
      if (program.programsAbove.some(program => !program.totalWeight))
        return true;
      program.totalWeight =
        program.weight +
        program.programsAbove.reduce(
          (sum, { totalWeight }) => sum + totalWeight,
          0
        );
    });
  }

  // Get the lowest program with wrong weight
  let [
    wrongWeight,
    rightWeight,
    weightOfProgramWithWrongWeight
  ] = programs.reduce(
    (acc, program) => {
      if (program.programsAbove.length === 0) return acc;

      let weightsAbove = program.programsAbove.map(
        ({ totalWeight }) => totalWeight
      );
      if (Math.min(...weightsAbove) === Math.max(...weightsAbove)) return acc;

      let wrongWeight = weightsAbove.find(
        (weight, i, weights) =>
          weight !== weights[(weights.length + i - 1) % weights.length] &&
          weight !== weights[(i + 1) % weights.length]
      );
      let rightWeight = weightsAbove.find(weight => weight !== wrongWeight);

      let [lowestWrongWeight] = acc;
      if (wrongWeight < lowestWrongWeight)
        return [
          wrongWeight,
          rightWeight,
          program.programsAbove.find(
            ({ totalWeight }) => totalWeight === wrongWeight
          ).weight
        ];

      return acc;
    },
    [Infinity]
  );

  // Calculate the right weight
  return weightOfProgramWithWrongWeight - wrongWeight + rightWeight;
}

const fs = require('fs');

const input = fs
  .readFileSync('input.txt')
  .toString()
  .trim();

console.log(part2(input));
