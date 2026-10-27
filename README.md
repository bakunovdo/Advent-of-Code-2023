# Advent of Code

Solutions live under `src/<year>/<day>/`. Shared helpers live in `tools/` and are imported as `#tools`.

## Setup

Install [Node.js](https://nodejs.org/en/), then:

```bash
npm install
```

### Session cookie

Fetching your puzzle input needs a session cookie in `.env`:

```bash
AOC_TOKEN="<session cookie from adventofcode.com>"
```

Copy the `session` cookie value from the browser dev tools on adventofcode.com.

## Generate a day

```bash
npm run generate -- <day> [year]
```

This creates `src/<year>/<day>/` with:

- `1.js` and `2.js`, titled from the puzzle page
- `example.txt`, the first example on the page
- `input.txt`, your puzzle input (gitignored)

```bash
npm run generate -- 9
npm run generate -- 1 2024
npm run generate -- 2024 1
```

During December, `npm run generate` with no arguments uses today's puzzle. Existing solution files are kept. Pass `--force` to refresh `input.txt` and `example.txt`. A blank download is an error and is not written. The stubs and example are still created when the input fetch fails.

## Run a day

```bash
npm run solve -- 2 2024
npm run solve -- 2024 2 1
```

`solve` runs part 1 and part 2. Export `exampleAnswer` from the solution once the statement gives it, and the runner checks `main(example)` before printing the real input. `node src/2024/02/1.js` runs that file directly.

Matches are green, mismatches are red, and an example without `exampleAnswer` is marked as not checked. `NO_COLOR=1` turns the colors off. Both scripts accept `--help`.

## Helpers

Import from `#tools`:

- `load(import.meta.url)` reads `example.txt` and `input.txt` next to the solution
- `lines`, `ints`, `blocks`, `grid`, `columns`, `zip`, `frequency`, `sum`
- `neighbors4`, `neighbors8`, `pointKey`, `inBounds`
- `bfs(start, neighbors)` returns `{ distance, parent, path }`

`frequency` returns a `Map`, so numeric keys stay numbers.
