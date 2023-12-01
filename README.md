# Advent CLI

<div align="center">
  <div>A Node.js program for solving <a href="https://adventofcode.com/">Advent of Code</a> problems 🎄</div>
  <br/>
  <img src="https://github.com/dtgreene/advent-cli/assets/24302976/5f76d744-673a-417e-ba60-79951cdc80fa" width="600px" />
</div>

### Usage

After cloning the repo (`git clone`) and installing the dependencies (`npm install`), simply run `npm start` to start the program.

### Creating Puzzles

To create a puzzle for a certain day, you'll need to create two files in the `/puzzles` directory (create the directory if it doesn't exist). One will be the puzzle solution and the other will be the puzzle input.

Example for setting up day 1:

#### `/puzzles/1.js`

```javascript
export function partOne(input) {
  // solution goes here
}

export function partTwo(input) {
  // solution goes here
}
```

#### `/puzzles/1.txt`

```
9cbncbxclbvkmfzdnldc
jjn1drdffhs
3six7
38rgtnqqxtc
rxszdkkv3j8kjhbm
...
```

The puzzle solution should have two named exports `partOne` and `partTwo`.  These functions will be called with the puzzle input as the first parameter.
