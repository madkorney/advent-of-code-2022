import { getInputDataForDay, getTestDataForDay, getTestBDataForDay } from '../util/index.js';
const DAY_NUMBER = 9;
const DAY_NUM = DAY_NUMBER.toString(10).padStart(2, '0');
const testAnswerA = 13;
const testAnswerB = 36;

// ======= Day 09 - puzzle description ======
//test inputs for A and B are different!

const transformInputData = (inputData: string[]) => {
  return inputData.map((line) => line.split(' '));
};

type Point = {
  x: number;
  y: number;
};

class Rope {
  knots: Point[];
  knotsNumber: number;
  tailTrail: Set<string>;

  constructor(knotsNumber: number) {
    this.knots = [];
    this.knotsNumber = knotsNumber;

    for (let i = 0; i < knotsNumber; i += 1) {
      this.knots.push({ x: 0, y: 0 });
    }

    this.tailTrail = new Set(['0 0']);
  }

  moveHead(direction: string) {
    switch (direction) {
      case 'U':
        this.knots[0].y += 1;
        break;
      case 'D':
        this.knots[0].y -= 1;
        break;
      case 'L':
        this.knots[0].x -= 1;
        break;
      case 'R':
        this.knots[0].x += 1;
        break;
    }
  }

  followPrevKnot(prevKnot: number) {
    const knot = prevKnot + 1;

    if (
      Math.abs(this.knots[knot].x - this.knots[prevKnot].x) <= 1 &&
      Math.abs(this.knots[knot].y - this.knots[prevKnot].y) <= 1
    )
      return;

    if (this.knots[knot].y - this.knots[prevKnot].y === 2) {
      //down
      this.knots[knot].x = this.knots[prevKnot].x;
      this.knots[knot].y -= 1;
    }

    if (this.knots[knot].y - this.knots[prevKnot].y === -2) {
      //up
      this.knots[knot].x = this.knots[prevKnot].x;
      this.knots[knot].y += 1;
    }
    if (this.knots[knot].x - this.knots[prevKnot].x === 2) {
      //left
      this.knots[knot].y = this.knots[prevKnot].y;
      this.knots[knot].x -= 1;
    }
    if (this.knots[knot].x - this.knots[prevKnot].x === -2) {
      //right
      this.knots[knot].y = this.knots[prevKnot].y;
      this.knots[knot].x += 1;
    }

    // switch (direction) {
    //   case 'U':
    //     this.knots[knot].x = this.knots[prevKnot].x;
    //     this.knots[knot].y += 1;
    //     break;
    //   case 'D':
    //     this.knots[knot].x = this.knots[prevKnot].x;
    //     this.knots[knot].y -= 1;
    //     break;
    //   case 'L':
    //     this.knots[knot].y = this.knots[prevKnot].y;
    //     this.knots[knot].x -= 1;
    //     break;
    //   case 'R':
    //     this.knots[knot].y = this.knots[prevKnot].y;
    //     this.knots[knot].x += 1;
    //     break;
    // }

    if (knot === this.knotsNumber - 1) {
      this.tailTrail.add(`${this.knots[knot].x} ${this.knots[knot].y}`);
    }
  }
}

const taskA = (inputData: string[]): number => {
  const moves = transformInputData(inputData);
  const knotsNumber = 2;
  const rope = new Rope(knotsNumber);

  moves.forEach(([direction, distance]) => {
    for (let i = 0; i < Number(distance); i += 1) {
      rope.moveHead(direction);
      for (let k = 0; k < knotsNumber - 1; k += 1) {
        rope.followPrevKnot(k);
      }
      // console.log(i,'head', rope.head.x, rope.head.y);
      // console.log(i, 'trail', rope.trail.x, rope.trail.y);
    }
  });
  // for (const trail of rope.tailTrail) {
  //   console.log(trail);
  // }

  return rope.tailTrail.size;
};

const taskB = (inputData: string[]): number => {
  const moves = transformInputData(inputData);
  const knotsNumber = 9;
  const rope = new Rope(knotsNumber);

  moves.forEach(([direction, distance]) => {
    for (let i = 0; i < Number(distance); i += 1) {
      rope.moveHead(direction);
      for (let k = 0; k < knotsNumber - 1; k += 1) {
        rope.followPrevKnot(k);
      }
      // console.log(i,'head', rope.head.x, rope.head.y);
      // console.log(i, 'trail', rope.trail.x, rope.trail.y);
    }
  });
  for (const trail of rope.tailTrail) {
    console.log('tr ', trail);
  }

  return rope.tailTrail.size;
};

try {
  const inputData = getInputDataForDay(DAY_NUMBER);
  const testData = getTestDataForDay(DAY_NUMBER);
  const testDataB = getTestBDataForDay(DAY_NUMBER);
  const testPartA = taskA(testData);
  const testPartB = taskB(testDataB);

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

  // console.log(`Day ${DAY_NUM}, Task B answer: ${taskB(inputData)}`);
} catch (error) {
  console.error('Error: ', (error as Error).message);
}
