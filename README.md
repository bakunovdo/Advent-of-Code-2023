# Advent of Code 2023

## Setup

Ensure you have a recent version of [Node.js](https://nodejs.org/en/)
installed, then run in your terminal:

```bash
git clone https://github.com/bakunovdo/advent-of-code-2023
cd advent-of-code-2023/
npm install
```

### Configure env

In order to use any of the automatic fetching tools, go to .env and place values:

```bash
AOC_TOKEN="<copy 'Cookie' request header from adventofcode.com in dev tools>"
```

### 1. Generate Stub Files

Begin your solution by first generating stub files:

```bash
npm run generate
```

This will create a new directory with four files and fetch task input(if token provided) and example input:

- `1.js (part-1)`
- `2.js (part-2)`
- `example.txt`
- `input.txt (ignored)`

By default, the directory will be named "wip" and be gitignored. The default
can be overridden with a command line arg.
