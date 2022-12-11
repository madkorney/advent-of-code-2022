import { getInputDataForDay, getTestDataForDay, getTestBDataForDay } from '../util/index.js';
const DAY_NUMBER = 10;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 13140;
const testAnswerB = 2;

// ======= Day 10 - puzzle description ======

const transformInputData = (inputData: string[]) => {
  return inputData.map((line) => line.split(' '));
};

const taskA = (inputData: string[]): number => {
  const instructions = transformInputData(inputData);
  let x = 1;
  let signalStrength = 0;
  let cycles = 1;

  for (let i = 0; i < instructions.length; i += 1) {
    
      cycles+= 1;
      if ((cycles - 20) % 40 === 0) {
        signalStrength += (cycles) * x;
        console.log('===',cycles, x, cycles * x);
      }
    if (instructions[i][0] === 'addx') {
      cycles+=1;
      x += Number(instructions[i][1]);
      if ((cycles - 20) % 40 === 0) {
        signalStrength += (cycles) * x;
        console.log('===',cycles, x, cycles * x);
      }
      // console.log(cycles, x, Number(instructions[i][1]));
    }

    // if (instructions[i - 2][0] === 'addx') {
    //   x += Number(instructions[i - 2][1]);
    //   console.log(x, Number(instructions[i - 2][1]));
    // }
    // if ((cycles - 20) % 40 === 0) {
    //   signalStrength += (cycles) * x;
    //   console.log('===',i+1, x, (i + 1) * x);
    // }
  }

  return signalStrength;
};

const taskB = (inputData: string[]): number => {
  const instructions = transformInputData(inputData);

  return 2;
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

  // console.log(
  //   `Day ${DAY_NUM}, Task B test: ${
  //     testPartB === testAnswerB ? 'passed' : 'failed! '
  //   } (answer is ${testPartB})`
  // );

  // console.log(`Day ${DAY_NUM}, Task B answer: ${taskB(inputData)}`);
} catch (error) {
  console.error('Error: ', (error as Error).message);
}
