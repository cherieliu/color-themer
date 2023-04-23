// eslint-disable-next-line import/no-extraneous-dependencies
const { test } = require('@jest/globals');
const assert = require('assert');
const path = require('path');
const utils = require('../dist/color-themer.cjs');

const impath = path.join(__dirname, 'testimg1.png');

/* Testing Values */
const imsize = 145756;
const imdims = [1200, 1200];

/* Tests on testimg1.png */
/* ----- UNIT TESTS ----- */
const imbuff = utils.parseImageToBuffer(impath);
test('Unit Test 1: tests parseImageToBuffer method', () => {
  assert.equal(imbuff.length, imsize);
});

const colors = utils.getRGBColors(imbuff);
// check number of pixels == number of RGB colors
test('Unit Test 2: tests getRGBColors method', () => {
  assert.equal(colors.length, imdims[0] * imdims[1]);
});

const colorCount = utils.getColorCount(colors);

// https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
function isHexColor(hex) {
  return typeof hex === 'string'
        && hex.length === 6
        && !Number.isNaN(Number(`0x${hex}`));
}

// check that each color is a valid HTML color
test('Unit Test 3: tests getColorCount method', () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(colorCount)) {
    assert.equal(true, isHexColor(key));
  }
});

const sortedColors = utils.sortColors(colorCount);
const counts = Object.values(sortedColors);
test('Unit Test 4: tests sortedColors method', () => {
  for (let i = 0; i < counts.length - 1; i += 1) {
    assert.equal(true, sortedColors[i][1] >= sortedColors[i + 1][1]);
  }
});

const top5Colors = utils.getTopNColors(sortedColors, 5);
test('Unit Test 5: tests top5Colors method', () => {
  assert.equal(top5Colors.length, 5);
});

const color1 = 'f542e3'; // rgb = (245, 66, 227)
const color2 = 'f53be2'; // rgb = (245, 59, 226)
const dist = Math.sqrt((66 - 59) * (66 - 59) + 1);
test('Unit Test 6: tests calculateColorDistance', () => {
  assert.equal(utils.calculateColorDistance(color1, color2), dist);
});

/* ----- INTEGRATION TEST ----- */
const top10Colors = utils.getColorScheme(impath, 10);
test('Integration Test', () => {
  assert.equal(top10Colors.length, 10);
});
