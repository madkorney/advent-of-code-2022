import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 2;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 15;
const testAnswerB = 12;

// ======= Day 02 - puzzle description ======

type Akeys = 'A' | 'B' | 'C';
type Xkeys = 'X' | 'Y' | 'Z';

const scorePointsGameA = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2, Z: 6 },
};

const scorePointsGameB = {
  A: { X: 3, Y: 4, Z: 8 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 2, Y: 6, Z: 7 },
};

// const transformInputData = (inputData: string[]) => {
//   return inputData;
// };

const taskA = (inputData: string[]): number => {
  const totalPoints = inputData
    .map((line) => line.split(' '))
    .map((game) => scorePointsGameA[game[0] as Akeys][game[1] as Xkeys])
    .reduce((sum, gameScore) => sum + gameScore, 0);

  return totalPoints;
};

const taskB = (inputData: string[]): number => {
  const totalPoints = inputData
    .map((line) => line.split(' '))
    .map((game) => scorePointsGameB[game[0] as Akeys][game[1] as Xkeys])
    .reduce((sum, gameScore) => sum + gameScore, 0);

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
