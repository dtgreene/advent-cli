import inquirer from 'inquirer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import 'colors';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const savePath = path.resolve(__dirname, 'save.dat');
const dayChoices = Array.from(Array(31)).map((_, index) => index + 1);

async function prompt() {
  if (existsSync(savePath)) {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          { name: 'Repeat the previous selection', value: 0 },
          { name: 'Select a day to solve', value: 1 },
        ],
      },
    ]);

    if (choice === 0) {
      try {
        const { prevDay, prevPart } = JSON.parse(
          readFileSync(savePath, 'utf-8')
        );

        if (prevDay !== undefined && prevPart !== undefined) {
          return solveDay(prevDay, prevPart);
        } else {
          throw new Error('Missing prevDay or prevPart props');
        }
      } catch (error) {
        console.warn(`Could not load save data: ${error.message}`.yellow);
        return;
      }
    }
  }

  return promptDay();
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
          { name: 'Part 1', value: 1 },
          { name: 'Part 2', value: 2 },
        ],
      },
    ]);

    await solveDay(day, part);
  } else {
    console.warn(`Input or solution missing for day ${day}`.yellow);
  }
}

async function solveDay(day, part) {
  const solutionPath = path.resolve(__dirname, `./solutions/${day}.js`);
  const inputPath = path.resolve(__dirname, `./solutions/${day}.txt`);

  if (existsSync(solutionPath) && existsSync(inputPath)) {
    const input = readFileSync(inputPath, 'utf-8').trim();
    const { partOne, partTwo } = await import(solutionPath);

    if ((part === 1 && !partOne) || (part === 2 && !partTwo)) {
      console.warn(
        `Part ${part} does not exist in the day ${day} solution.`.yellow
      );
    } else {
      try {
        let answer = null;

        if (part === 1) {
          answer = partOne(input);
        } else {
          answer = partTwo(input);
        }

        if (answer !== null) {
          console.log(`Answer for day ${day} part ${part}: ${answer}`.green);
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

  try {
    writeFileSync(savePath, JSON.stringify({ prevDay: day, prevPart: part }));
  } catch (error) {
    console.warn(`Could not save data: ${error.message}`.yellow);
  }
}

console.clear();
await prompt();
