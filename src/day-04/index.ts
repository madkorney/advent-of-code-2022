import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 4;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 2;
const testAnswerB = 4;

// ======= Day 04 - puzzle description ======
// .234.....  2-4
// .....678.  6-8 -> [[2, 4],[6, 8]]
// 17-99,18-24

const transformInputData = (inputData: string[]) => {
  return inputData.map((line) => line.split(',').map((pair) => pair.split('-').map(Number)));
};

const taskA = (inputData: string[]): number => {
  const data = transformInputData(inputData);

  const pairsWithFullIntersection = data.reduce((summ, pair) => {
    return (pair[0][0] - pair[1][0]) * (pair[0][1] - pair[1][1]) <= 0 ? summ + 1 : summ;
  }, 0);

  return pairsWithFullIntersection;
};

const taskB = (inputData: string[]): number => {
  const data = transformInputData(inputData);

  const pairsWithPartialntersection = data.reduce((summ, pair) => {
    return !(pair[0][0] > pair[1][1] || pair[0][1] < pair[1][0]) ? summ + 1 : summ;
  }, 0);

  return pairsWithPartialntersection;
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
