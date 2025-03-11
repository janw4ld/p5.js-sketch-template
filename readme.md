# a sketch scaffold with custom p5.js

- run `npm i` inside each of [`./p5.js`](./p5.js) and [`./sketch`](./sketch)
- run `npm run build` in [`./p5.js](./p5.js) to bundle the p5.js library
- run `npm run dev` in [`./sketch`](./sketch) to start the sketch

## how this works

the sketches are html files that import `p5.js` as a static script from a CDN, so to use our custom `p5.js`, we just bundle it and use that. in this scaffold [`./sketch/public/lib`](./sketch/public/lib/) is a symlink to the build outputs of [`./p5.js`](./p5.js) to avoid having to copy the scripts over after each compilation.
