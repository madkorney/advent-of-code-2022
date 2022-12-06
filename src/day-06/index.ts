import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 6;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 7;
const testAnswerB = 19;

// ======= Day 05 - puzzle description ======

const transformInputData = (inputData: string[]): string => {
  return inputData[0];
};

const getWhatevertMarkerPositionByMarkerSizeByLoopingThruTheDataString = (
  markerSize: number,
  data: string
) => {
  for (let i = markerSize - 1; i < data.length; i += 1) {
    const probe = new Set(data.slice(i - markerSize + 1, i + 1));
    if (probe.size === markerSize) return i + 1;
  }
  return 0;
};

const taskA = (inputData: string[]): number => {
  const data = transformInputData(inputData);
  const markerSize = 4;
  return getWhatevertMarkerPositionByMarkerSizeByLoopingThruTheDataString(markerSize, data);
};

const taskB = (inputData: string[]): number => {
  const data = transformInputData(inputData);
  const markerSize = 14;
  return getWhatevertMarkerPositionByMarkerSizeByLoopingThruTheDataString(markerSize, data);
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
