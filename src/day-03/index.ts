import { getInputDataForDay, getTestDataForDay } from '../util/index.js';

const DAY_NUMBER = 3;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 157;
const testAnswerB = 70;

const getItemPriority = (char: string): number => {
  // const charCode = char.charCodeAt(0);
  // const priority = charCode < 97 ? charCode - 65 + 27 : charCode - 97 + 1;
  const priorityPositions = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const priority = priorityPositions.indexOf(char);

  return priority;
};

const taskA = (inputData: string[]): number => {
  let sumPriorities = 0;
  let sharedItem = '';

  inputData.forEach((rucksack) => {
    const compartment1 = rucksack.slice(0, rucksack.length * 0.5);
    const compartment2 = rucksack.slice(rucksack.length * 0.5);

    compartment1.split('').forEach((item: string) => {
      if (compartment2.includes(item)) sharedItem = item;
    });

    sumPriorities += getItemPriority(sharedItem);
  });

  return sumPriorities;
};

const taskB = (inputData: string[]): number => {
  let sumPriorities = 0;
  let sharedItem = '';

  for (let i = 0; i < inputData.length; i += 3) {
    const [rucksack1, rucksack2, rucksack3] = [inputData[i], inputData[i + 1], inputData[i + 2]];

    rucksack1.split('').forEach((item: string) => {
      if (rucksack2.includes(item) && rucksack3.includes(item)) sharedItem = item;
    });

    sumPriorities += getItemPriority(sharedItem);
  }

  return sumPriorities;
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
