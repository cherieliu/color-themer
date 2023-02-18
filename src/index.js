const fs = require('fs');
const path = require('path');

export function parseImage(imagePath) {
    console.log('IN HERE');
    try {
        console.log(imagePath);
        const imageBuffer= fs.readFileSync(imagePath);
        console.log(imageBuffer.shape);
    } catch (err) {
        console.log(err);
    }
}
