/*const utils = require('..');
const assert = require('assert');

utils.parseImage('/Users/cherieliu/Desktop/Spring 2023/OSS/color-themer/test/testimg1.png');
*/

const utils = require('..');
const assert = require('assert');
const path = require('path');

let impath = path.join(__dirname, 'testimg1.png');
utils.parseImage(impath);

console.log(`\u001B[32m✓\u001B[39m Tests passed`);