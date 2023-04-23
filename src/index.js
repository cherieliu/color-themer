const fs = require('fs');
const { PNG } = require('pngjs');

export function parseImageToBuffer(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer;
  } catch (err) {
    /* empty */
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

export function calculateColorDistance(hex1, hex2) {
  const hex1int = parseInt(hex1, 16);
  // eslint-disable-next-line no-bitwise
  const r1 = (hex1int >> 16) & 255;
  // eslint-disable-next-line no-bitwise
  const g1 = (hex1int >> 8) & 255;
  // eslint-disable-next-line no-bitwise
  const b1 = hex1int & 255;

  const hex2int = parseInt(hex2, 16);
  // eslint-disable-next-line no-bitwise
  const r2 = (hex2int >> 16) & 255;
  // eslint-disable-next-line no-bitwise
  const g2 = (hex2int >> 8) & 255;
  // eslint-disable-next-line no-bitwise
  const b2 = hex2int & 255;
  const dist = Math.sqrt((r1 - r2) * (r1 - r2) + (g1 - g2) * (g1 - g2) + (b1 - b2) * (b1 - b2));
  return dist;
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

/**
 * Main function of the color-themer library that provides its functionalities.
 * Uses the private helper functions to extract a color theme from the inputted image.
 * @param {string} imagePath - Filepath of input image
 * @param {Number} n - Number of colors in the color theme
 * @returns Color theme with the top n colors
 * @throws Error when imagePath cannot be read
 */
export function getColorScheme(imagePath, n) {
  const imageBuff = parseImageToBuffer(imagePath);
  if (imageBuff == null) {
    throw new Error('Can not read input image provided');
  }
  const colors = getRGBColors(imageBuff);
  const colorCounts = getColorCount(colors);
  const sortedColors = sortColors(colorCounts);
  return getTopNColors(sortedColors, n);
}
