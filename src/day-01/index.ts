import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 1;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 24_000;
const testAnswerB = 45_000;

// ======= Day 01 ======

const transformInputData = (inputData: string[]) => {
  return inputData;
};

const taskA = (inputData: string[]): number => {
  const data = transformInputData(inputData);
  let maxCalories = 0;
  let currentCalories = 0;

  for (let i = 0; i < data.length; i += 1) {
    if (!data[i]) {
      maxCalories = Math.max(maxCalories, currentCalories);
      currentCalories = 0;
    } else {
      currentCalories += Number(data[i]);
    }
  }

  return maxCalories;
};

const taskB = (inputData: string[]): number => {
  const data = transformInputData(inputData);
  const caloriesPerElf = [];
  let currentElfCalories = 0;

  for (let i = 0; i < data.length; i += 1) {
    if (!data[i]) {
      caloriesPerElf.push(currentElfCalories);
      currentElfCalories = 0;
    } else {
      currentElfCalories += Number(data[i]);
    }
  }
  if (currentElfCalories > 0) caloriesPerElf.push(currentElfCalories);
  caloriesPerElf.sort((a, b) => b - a);
  return caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2];
};

const inputData = getInputDataForDay(DAY_NUMBER);
const testData = getTestDataForDay(DAY_NUMBER);

console.log(
  `Day ${DAY_NUM}, Task A test: ${taskA(testData) === testAnswerA ? 'passed' : 'failed!'}`
);
console.log(
  `Day ${DAY_NUM}, Task B test: ${taskB(testData) === testAnswerB ? 'passed' : 'failed!'}`
);

console.log(`Day ${DAY_NUM}, Task A answer: ${taskA(inputData)}`);
console.log(`Day ${DAY_NUM}, Task B answer: ${taskB(inputData)}`);
