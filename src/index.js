const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;

export function getColorScheme(imagePath, n) {
    var imageBuff = parseImageToBuffer(imagePath);
    var colors = getRGBColors(imageBuff);
    var colorCounts = getColorCount(colors);
    var sortedColors = sortColors(colorCounts);
    return getTopNColors(sortedColors, n);
}

export function parseImageToBuffer(imagePath) {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        return imageBuffer;
    } catch (err) {
        console.log(err);
    }
}

export function getRGBColors(imageBuffer) {
    var colors = [];
    var pixels, r, g, b;
    r = g = b = 0;
    var i = 0;
    var png = PNG.sync.read(imageBuffer).data;
    pixels = png.length / 4;
    for (i = 0; i < pixels; i++) {
        r = png[i];
        g = png[i+1];
        b = png[i+2];
        let color = [r, g, b];
        colors.push(color);
    }
    return colors;
}

export function getColorCount(colors) {
    let colorCount = {};
    let i = 0;
    var hex, r, g, b;
    r = g = b = 0;
    for (i = 0; i < colors.length; i++) {
        let rgb = colors[i];
        r = rgb[0];
        g = rgb[1];
        b = rgb[2];
        hex = ((r << 16) | (g << 8) | b).toString(16);
        // invalid hex code
        if (hex.length !== 6 || isNaN(Number('0x' + hex))) {
            continue;
        }
        if (hex in colorCount) {
            colorCount[hex]++;
        } else {
            colorCount[hex] = 1;
        }
    }
    return colorCount;
}

export function sortColors(colorCounts) {
    var counts = Object.keys(colorCounts).map(
        (key) => { return [key, colorCounts[key]] });
    counts.sort(
        (first, second) => {return first[1] - second[1]});
    var keys = counts.map(
        (e) => { return [e[0], e[1]]}
    ).reverse();
    return keys;
}

export function getTopNColors(colors, n) {
    let topColorCounts = colors.slice(0, n);
    var topColors = topColorCounts.map(
        (col) => { return col[0]}
    );

    return topColors;
}
