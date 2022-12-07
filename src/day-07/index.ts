import { getInputDataForDay, getTestDataForDay } from '../util/index.js';
const DAY_NUMBER = 7;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 95437;
const testAnswerB = 24933642;

// ======= Day 07 - puzzle description ======

const getCumulativeDirList = (inputData: string[]): Map<string, number> => {
  let currentDir = '';
  let currentDirSize = 0;
  const dirList = new Map();

  inputData.forEach((line) => {
    const parse = line.split(' ');

    if (parse[0] === '$' && parse[1] === 'cd') {
      if (currentDir && !dirList.has(currentDir)) {
        dirList.set(currentDir, currentDirSize);
        currentDirSize = 0;
      }

      if (parse[2] === '..') {
        currentDir = currentDir.slice(0, currentDir.lastIndexOf('-'));
      } else {
        currentDir = currentDir ? `${currentDir}-${parse[2]}` : parse[2];
      }
    }

    if (!isNaN(Number(parse[0]))) {
      currentDirSize += Number(parse[0]);
    }
  });
  if (currentDirSize && !dirList.has(currentDir)) dirList.set(currentDir, currentDirSize);

  const keys: string[] = Array.from(dirList.keys());
  const dirListCumulativeSizes = new Map();

  keys.forEach((key) => {
    const cumulativeSize =
      dirList.get(key) +
      keys.reduce((sum, itemKey) => {
        if (itemKey === key) return sum;
        return itemKey.includes(key) ? sum + dirList.get(itemKey) : sum;
      }, 0);
    dirListCumulativeSizes.set(key, cumulativeSize);
  });

  return dirListCumulativeSizes;
};

const taskA = (inputData: string[]): number => {
  const maxSize = 100_000;
  const dirSizeList = getCumulativeDirList(inputData);

  let sumOfSmallSizes = 0;

  for (const size of dirSizeList.values()) {
    if (size <= maxSize) sumOfSmallSizes += size;
  }

  // console.table(dirSizeList);
  return sumOfSmallSizes;
};

const taskB = (inputData: string[]): number => {
  const totalSpace = 70_000_000;
  const requiredUnusedSpace = 30_000_000;
  const root = '/';
  const dirSizeList = getCumulativeDirList(inputData);
  const currentUnusedSpace = totalSpace - dirSizeList.get(root)!;
  const needToFreeSpace = requiredUnusedSpace - currentUnusedSpace;

  const dirSizeToDelete =
    Array.from(dirSizeList.values())
      .sort((a, b) => a - b)
      .find((size) => size >= needToFreeSpace) || -1;

  return dirSizeToDelete;
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
