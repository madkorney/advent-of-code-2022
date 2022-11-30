import { getInputDataForDay } from '../util/index.js';
const DAY_NUMBER = 2;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');

// ======= Day 02 - puzzle description ======
//

const transformInputData = (inputData: string[]) => {
  return inputData;
};

const taskA = (inputData: string[]): number => {
  const data = transformInputData(inputData);

  return 1;
};

const taskB = (inputData: string[]): number => {
  const data = transformInputData(inputData);

  return 2;
};

const inputData = getInputDataForDay(DAY_NUMBER);
console.log(`Day ${DAY_NUM}, Task A answer: ${taskA(inputData)}`);
console.log(`Day ${DAY_NUM}, Task B answer: ${taskB(inputData)}`);
