import inquirer from 'inquirer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';
import 'colors';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dayChoices = Array.from(Array(31)).map((_, index) => String(index + 1));

let prevDay = null;
let prevPart = null;

async function main() {
  while (true) {
    if (prevDay !== null && prevPart !== null) {
      const { choice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: [
            { name: 'Repeat the previous selection', value: 1 },
            { name: 'Select a day to solve', value: 0 },
          ],
        },
      ]);

      if (choice === 0) {
        await promptDay();
      } else {
        await solveDay(prevDay, prevPart);
      }
    } else {
      await promptDay();
    }

    console.log('\n');
  }
}

async function promptDay() {
  const { day } = await inquirer.prompt([
    {
      type: 'list',
      name: 'day',
      message: 'Which day should be solved?',
      choices: dayChoices,
    },
  ]);

  const solutionPath = path.resolve(__dirname, `./solutions/${day}.js`);
  const inputPath = path.resolve(__dirname, `./solutions/${day}.txt`);

  if (existsSync(solutionPath) && existsSync(inputPath)) {
    const { part } = await inquirer.prompt([
      {
        type: 'list',
        name: 'part',
        message: 'Which part should be solved?',
        choices: [
          { name: 'Part 1', value: 0 },
          { name: 'Part 2', value: 1 },
        ],
      },
    ]);

    await solveDay(day, part);
  } else {
    console.warn(`Input or solution missing for day ${day}`.yellow);
  }
}

async function solveDay(day, part) {
  prevDay = day;
  prevPart = part;

  const solutionPath = path.resolve(__dirname, `./solutions/${day}.js`);
  const inputPath = path.resolve(__dirname, `./solutions/${day}.txt`);

  if (existsSync(solutionPath) && existsSync(inputPath)) {
    const input = readFileSync(inputPath, 'utf-8');
    const { partOne, partTwo } = await import(solutionPath);

    if ((part === 0 && !partOne) || (part === 1 && !partTwo)) {
      console.warn(
        `Part ${part} does not exist in the day ${day} solution.`.yellow
      );
    } else {
      try {
        let answer = null;

        if (part === 0) {
          answer = partOne(input);
        } else {
          answer = partTwo(input);
        }

        if (answer !== null) {
          console.log(
            `Answer for day ${day} part ${part + 1}: ${answer}`.green
          );
        } else {
          console.log(
            `Answer for day ${day} part ${
              part + 1
            } was null. Check that the solution function returns a value.`.green
          );
        }
      } catch (error) {
        console.error(`There was an error solving: ${error.message}`.red);
      }
    }
  } else {
    console.warn(`Input or solution missing for day ${day}`.yellow);
  }
}

console.clear();
main();
