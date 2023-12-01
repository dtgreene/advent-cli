# Advent CLI 🎄

<div align="center">
  <div>An easy way to manage and run <a href="https://adventofcode.com/">Advent of Code</a> NodeJS solutions</div>
  <br/>
  <img src="https://github.com/dtgreene/advent-cli/assets/24302976/5f76d744-673a-417e-ba60-79951cdc80fa" width="600px" />
</div>

### Usage

After cloning the repo (`git clone`) and installing the dependencies (`npm install`), simply run `npm start` to start the program.

### Creating Solutions

To create a solution for a certain day, you'll need to create two files in the `/solutions` directory (create the directory if it doesn't exist). One will be the solution itself and the other will be the puzzle input.

Example for setting up day 1:

#### `/solutions/1.js`

```javascript
export function partOne(input) {
  // solution goes here
}

export function partTwo(input) {
  // solution goes here
}
```

#### `/solutions/1.txt`

```
9cbncbxclbvkmfzdnldc
jjn1drdffhs
3six7
38rgtnqqxtc
rxszdkkv3j8kjhbm
...
```

The solution file should have two named exports `partOne` and `partTwo`.  These functions will be called with the puzzle input as the first parameter.
