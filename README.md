# Advent CLI

A Node.js program for solving [Advent of Code](https://adventofcode.com/) problems 🎄

![advent-cli](https://github.com/dtgreene/advent-cli/assets/24302976/5f76d744-673a-417e-ba60-79951cdc80fa)


### Usage

After cloning the repo (`git clone`) and installing the dependencies (`npm install`), simply run `npm start` to start the program.

### Creating Solutions

To create a solution for a certain day, you'll need to create two files in the `/solutions` directory (create the directory if it doesn't exist). One will be the solution itself and the other will be the problem input as a `.txt` file.  

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

The solution file should have two named exports for `partOne` and `partTwo` functions that will be called with the input as the first parameter. The input is simply read from the input file and not parsed in any way.

