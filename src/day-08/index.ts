import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 8;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 21;
const testAnswerB = 8;

// ======= Day 08 - puzzle description ======

const transformInputData = (inputData: string[]) => {
  return inputData.map((line) => line.split('').map(Number));
};

const transpose = (data: number[][]) => {
  const transposedData: number[][] = [];

  for (let k = 0; k < data[0].length; k += 1) {
    transposedData.push([]);
    for (let i = 0; i < data.length; i += 1) {
      transposedData[k].push(data[i][k]);
    }
  }

  return transposedData;
};

const taskA = (inputData: string[]): number => {
  const horizontalLines = transformInputData(inputData);
  const verticalLines = transpose(horizontalLines);
  const rowsNumber = inputData.length;
  const columnsNumber = inputData[0].length;

  const edgeTreesNumber = 2 * (rowsNumber + columnsNumber) - 4;
  let visibleTreesNumber = edgeTreesNumber;
  for (let i = 1; i < rowsNumber - 1; i += 1) {
    for (let k = 1; k < columnsNumber - 1; k += 1) {
      const isNotVisible: boolean =
        horizontalLines[i]
          .slice(0, k)
          .filter((heigth) => heigth >= horizontalLines[i][k])
          .length > 0 &&
        horizontalLines[i]
          .slice(k + 1, columnsNumber)
          .filter((heigth) => heigth >= horizontalLines[i][k])
          .length > 0 &&
        verticalLines[k]
          .slice(0, i)
          .filter((heigth) => heigth >= verticalLines[k][i])
          .length > 0 &&
        verticalLines[k]
          .slice(i + 1, rowsNumber)
          .filter((heigth) => heigth >= verticalLines[k][i])
          .length > 0;

      if (!isNotVisible) visibleTreesNumber += 1;
    }
  }

  return visibleTreesNumber;
};

const taskB = (inputData: string[]): number => {
  const horizontalLines = transformInputData(inputData);
  const verticalLines = transpose(horizontalLines);
  const rowsNumber = inputData.length;
  const columnsNumber = inputData[0].length;

  let maxScenicScore = 0;

  for (let i = 1; i < rowsNumber - 1; i += 1) {
    for (let k = 1; k < columnsNumber - 1; k += 1) {
      const leftSide = horizontalLines[i].slice(0, k);
      const leftViewBlockPos = leftSide
        .reverse()
        .findIndex((heigth) => heigth >= horizontalLines[i][k]);
      const leftViewDistance = leftViewBlockPos == -1 ? leftSide.length : leftViewBlockPos + 1;

      const rigthSide = horizontalLines[i].slice(k + 1, columnsNumber);
      const rightViewBlockPos = rigthSide.findIndex((heigth) => heigth >= horizontalLines[i][k]);
      const rightViewDistance = rightViewBlockPos === -1 ? rigthSide.length : rightViewBlockPos + 1;

      const topSide = verticalLines[k].slice(0, i);
      const topViewBlockPos = topSide
        .reverse()
        .findIndex((heigth) => heigth >= verticalLines[k][i]);
      const topViewDistance = topViewBlockPos === -1 ? topSide.length : topViewBlockPos + 1;

      const bottomSide = verticalLines[k].slice(i + 1, rowsNumber);
      const bottomViewBlockPos = bottomSide.findIndex((heigth) => heigth >= verticalLines[k][i]);
      const bottomViewDistance = bottomViewBlockPos === -1 ? bottomSide.length : bottomViewBlockPos + 1;

      const scenicScore =
        leftViewDistance * rightViewDistance * topViewDistance * bottomViewDistance;
      maxScenicScore = Math.max(maxScenicScore, scenicScore);
    }
  }

  return maxScenicScore;
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
