const assert = require('assert');
const path = require('path');
const utils = require('..');

const impath = path.join(__dirname, 'testimg1.png');

/* Testing Values */
const imsize = 145756;
const imdims = [1200, 1200];

/* Tests on testimg1.png */
/* ----- UNIT TESTS ----- */
const imbuff = utils.parseImageToBuffer(impath);
assert.equal(imbuff.length, imsize);

const colors = utils.getRGBColors(imbuff);
// check number of pixels == number of RGB colors
assert.equal(colors.length, imdims[0] * imdims[1]);

const colorCount = utils.getColorCount(colors);

// https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
function isHexColor(hex) {
  return typeof hex === 'string'
        && hex.length === 6
        && !Number.isNaN(Number(`0x${hex}`));
}

// check that each color is a valid HTML color
// eslint-disable-next-line no-restricted-syntax
for (const [key] of Object.entries(colorCount)) {
  assert.equal(true, isHexColor(key));
}

const sortedColors = utils.sortColors(colorCount);
const counts = Object.values(sortedColors);
for (let i = 0; i < counts.length - 1; i += 1) {
  assert.equal(true, sortedColors[i][1] >= sortedColors[i + 1][1]);
}

const top5Colors = utils.getTopNColors(sortedColors, 5);
assert.equal(top5Colors.length, 5);

console.log('\u001B[32m✓\u001B[39m Unit Tests passed');

/* ----- INTEGRATION TEST ----- */
const top10Colors = utils.getColorScheme(impath, 10);
assert.equal(top10Colors.length, 10);

console.log('\u001B[32m✓\u001B[39m Integration Test passed');
