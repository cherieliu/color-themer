const utils = require('..');
const assert = require('assert');
const path = require('path');
const sizeOf = require('image-size');

let impath = path.join(__dirname, 'testimg1.png');

/* Testing Values */
let imsize = 145756;
let imdims = [1200, 1200];

/* Tests on testimg1.png */
let imbuff = utils.parseImageToBuffer(impath);
assert.equal(imbuff.length, imsize);

let colors = utils.getRGBColors(imbuff);
// check number of pixels == number of RGB colors
assert.equal(colors.length, imdims[0] * imdims[1]);

let colorCount = utils.getColorCount(colors);
// check that each color is valid

// https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
function isHexColor (hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

for (const [key, value] of Object.entries(colorCount)) {
    assert.equal(true, isHexColor(key));
}

let topColors = utils.sortColors(colorCount);
let counts = Object.values(topColors);
for (var i = 0; i < counts.length - 1; i++) {
    assert.equal(true, topColors[i][1] >= topColors[i+1][1]);
}



console.log(`\u001B[32m✓\u001B[39m Tests passed`);