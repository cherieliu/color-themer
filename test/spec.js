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

let imPixels = [];
// console.log(imbuff);
let colors = utils.getRGBColors(imbuff);
// check number of pixels == number of RGB colors
assert.equal(colors.length, imdims[0] * imdims[1]);
// console.log(colors);
// console.log(imPixels);
// ssert.equal(impixels.shape, imdims);
// assert.equal(impixels.shape.slice()[1], imheight);


console.log(`\u001B[32m✓\u001B[39m Tests passed`);