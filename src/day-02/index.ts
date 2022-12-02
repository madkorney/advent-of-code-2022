import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 2;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 15;
const testAnswerB = 12;

// ======= Day 02 - puzzle description ======

const scorePointsGameA = {
  'A X': 4,
  'A Y': 8,
  'A Z': 3,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 7,
  'C Y': 2,
  'C Z': 6,
};

const scorePointsGameB = {
  'A X': 3,
  'A Y': 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7,
};

const taskA = (inputData: string[]): number => {
  const totalPoints = inputData.reduce(
    (sum, key) => sum + scorePointsGameA[key as keyof typeof scorePointsGameA],
    0
  );

  return totalPoints;
};

const taskB = (inputData: string[]): number => {
  const totalPoints = inputData.reduce(
    (sum, key) => sum + scorePointsGameB[key as keyof typeof scorePointsGameB],
    0
  );

  return totalPoints;
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
