import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 5;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 'CMZ';
const testAnswerB = 'MCD';

// ======= Day 05 - puzzle description ======

const getStackCommands = (inputData: string[]) => {
  const splitIndex = inputData.findIndex((line) => !line);
  if (splitIndex === -1) return [];

  return inputData.slice(splitIndex + 1).map((line) =>
    line
      .split(' ')
      .map(Number)
      .filter((item) => !isNaN(item))
  );
};

const getStacks = (inputData: string[]) => {
  const splitIndex = inputData.findIndex((line) => !line);
  if (splitIndex === -1) return [];

  const rawStackLines = inputData.slice(0, splitIndex - 1).reverse();
  const numberOfStacks = Math.max(...inputData[splitIndex - 1].split(' ').map(Number));
  const stacks: string[][] = [];

  for (let k = 0; k < numberOfStacks; k += 1) {
    stacks.push([]);
  }
  rawStackLines.forEach((lineToParse) => {
    for (let k = 0; k < numberOfStacks; k += 1) {
      if (lineToParse[1 + k * 4] !== ' ') stacks[k].push(lineToParse[1 + k * 4]);
    }
  });

  return stacks;
};

const taskA = (inputData: string[]): string => {
  const stacks = getStacks(inputData);
  const stackCommands = getStackCommands(inputData);

  stackCommands.forEach(([numberOfCratesToMove, stackFrom, stackTo]) => {
    for (let k = 0; k < numberOfCratesToMove; k += 1) {
      const crate = stacks[stackFrom - 1].pop();
      if (crate) stacks[stackTo - 1].push(crate);
    }
  });

  const stackTops = stacks.reduce((acc, stack) => acc + stack[stack.length - 1], '');

  return stackTops;
};

const taskB = (inputData: string[]): string => {
  const stacks = getStacks(inputData);
  const stackCommands = getStackCommands(inputData);

  stackCommands.forEach(([numberOfCratesToMove, stackFrom, stackTo]) => {
    const cratesBatch: string[] = [];
    for (let k = 0; k < numberOfCratesToMove; k += 1) {
      cratesBatch.push(stacks[stackFrom - 1].pop() as string);
    }
    for (let k = 0; k < numberOfCratesToMove; k += 1) {
      stacks[stackTo - 1].push(cratesBatch.pop() as string);
    }
  });

  const stackTops = stacks.reduce((acc, stack) => acc + stack[stack.length - 1], '');

  return stackTops;
};

try {
  const inputData = getInputDataForDay(DAY_NUMBER);
  const testData = getTestDataForDay(DAY_NUMBER);
  const testPartA = taskA(testData);
  const testPartB = taskB(testData);

  console.log(
    `Day ${DAY_NUM}, Task A test: ${
      testPartA === testAnswerA ? 'passed' : 'failed!'
    } (answer is ${testPartA})`
  );

  console.log(`Day ${DAY_NUM}, Task A answer: ${taskA(inputData)}`);

  console.log(
    `Day ${DAY_NUM}, Task B test: ${
      testPartB === testAnswerB ? 'passed' : 'failed! '
    } (answer is ${testPartB})`
  );

  console.log(`Day ${DAY_NUM}, Task B answer: ${taskB(inputData)}`);
} catch (error) {
  console.error('Error: ', (error as Error).message);
}
