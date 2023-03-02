const fs = require('fs');
const { PNG } = require('pngjs');

export function parseImageToBuffer(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer;
  } catch (err) {
    console.log(err);
  }

  // default return value
  return null;
}

export function getRGBColors(imageBuffer) {
  const colors = [];
  let r;
  let g;
  let b;
  r = 0;
  g = 0;
  b = 0;
  let i = 0;
  const png = PNG.sync.read(imageBuffer).data;
  const pixels = png.length / 4;
  for (i = 0; i < pixels; i += 1) {
    r = png[i];
    g = png[i + 1];
    b = png[i + 2];
    const color = [r, g, b];
    colors.push(color);
  }
  return colors;
}

export function getColorCount(colors) {
  const colorCount = {};
  let i = 0;
  let hex;
  let r;
  let g;
  let b;
  r = 0;
  g = 0;
  b = 0;
  for (i = 0; i < colors.length; i += 1) {
    const rgb = colors[i];
    [r, g, b] = rgb;
    // eslint-disable-next-line no-bitwise
    hex = ((r << 16) | (g << 8) | b).toString(16);
    // invalid hex code
    if (hex.length === 6 && !Number.isNaN(Number(`0x${hex}`))) {
      if (hex in colorCount) {
        colorCount[hex] += 1;
      } else {
        colorCount[hex] = 1;
      }
    }
  }
  return colorCount;
}

export function sortColors(colorCounts) {
  const counts = Object.keys(colorCounts).map(
    (key) => [key, colorCounts[key]],
  );
  counts.sort(
    (first, second) => first[1] - second[1],
  );
  const keys = counts.map(
    (e) => [e[0], e[1]],
  ).reverse();
  return keys;
}

export function getTopNColors(colors, n) {
  const topColorCounts = colors.slice(0, n);
  const topColors = topColorCounts.map(
    (col) => col[0],
  );
  return topColors;
}

export function getColorScheme(imagePath, n) {
  const imageBuff = parseImageToBuffer(imagePath);
  const colors = getRGBColors(imageBuff);
  const colorCounts = getColorCount(colors);
  const sortedColors = sortColors(colorCounts);
  return getTopNColors(sortedColors, n);
}
