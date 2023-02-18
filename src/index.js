const fs = require('fs');
const path = require('path');
// const getColors = require('get-image-colors');
const getPixels = require("get-pixels");
const PNG = require('pngjs').PNG;

export function parseImageToBuffer(imagePath) {
    try {
        console.log(imagePath);
        const imageBuffer = fs.readFileSync(imagePath);
        return imageBuffer;
    } catch (err) {
        console.log(err);
    }
}

export function getRGBColors(imageBuffer) {
    var colors = [];
    var pixels, r, g, b, a;
    r = g = b = a = 0;
    var i = 0;

    console.log(imageBuffer);

    var png = PNG.sync.read(imageBuffer).data;
    pixels = png.length / 4;

    for (i = 0; i < pixels; i++) {
        r = png[i];
        g = png[i+1];
        b = png[i+2];
        a = png[i+3];
        // pixel is > 50% transparent
        /*if (a < (255 / 2)) {
            continue;
        }*/

        let color = [r, g, b];
        colors.push(color);
    }

    return colors;

    // console.log(colors[15000]);

    /*for (const value of png.data.values()) {
        if (i % 4 == 0) {
            r = 
        }
    }*/

    /*for (const value of imageBuffer) {
        console.log(value);
        if (i == 4) {
            break;
        }
        i += 1;
    }*/

    /*var colors = [];
    getPixels(imageBuffer, 'image/png', function(err, pixels) {
        if (err) {clear

            console.log("Bad Image Path");
            return;
        }

        console.log(pixels.data);
        colors.push(1);
    })*/
    // var png = PNG.sync.read(imageBuffer);
    // console.log(png.data);



    /*getPixels(imageBuffer, 'image/png', function(err, pixels) {
        if (err) {
            console.log("Bad Image Path");
            return;
        } 
        imPixels = pixels;
    })*/
    return colors;
}
