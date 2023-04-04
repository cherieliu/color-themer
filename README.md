# color-themer
A Javascript library that generates RGB colors based on a theme.

[![npm](https://img.shields.io/npm/v/color-themer)](https://www.npmjs.com/package/color-themer)

[![](https://img.shields.io/badge/license-MIT-ff69b4)](./LICENSE)

![](https://img.shields.io/github/issues/cherieliu/color-themer?logoColor=ff69b4)

[![Build Status](https://github.com/cherieliu/color-themer/workflows/Build%20Status/badge.svg?branch=main)]((https://github.com/cherieliu/color-themer/actions?query=workflow%3A%22Build+Status%22))
[![codecov](https://codecov.io/gh/cherieliu/color-themer/branch/hw5/graph/badge.svg)](https://app.codecov.io/gh/cherieliu/color-themer/tree/main)
[![Github Page](https://img.shields.io/badge/Github%20Pages-link-blueviolet)](https://cherieliu.github.io/color-themer/)

## Overview
Currently, a pain point for Javascript frontend development is the need to find cohesive colors and their RGB codes. Personally, I require a lot of time to test different colors and alter the RGB values so that the components on a page all look unified. 

This library will automatically generate RGB color codes based on a user-inputted image. It will select the most common colors in the image to be part of the theme. 

### Installation
npm install color-themer

### Usage
To run the package, call the method getColorScheme with the input image and the number of colors wanted.


