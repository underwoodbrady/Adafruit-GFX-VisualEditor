![Visual Editor Logo](https://i.imgur.com/4x2mvKa.png)

<p align="center">
  <img src="https://img.shields.io/github/release/chartjs/Chart.js.svg?style=flat-square&maxAge=600" alt="Downloads">
</p>

<h1 align="center">Visual Graphics to Arduino Sketches</h1>

Adafruit GFX Visual Editor is an online HTML canvas based visual editing software that converts your designs directly into Arduino code compatible with most microcontrollers and displays. 

It is available [online for free](https://pocket.montana.icu/auth/register) or you can run on your own computer using the steps in Local Setup. If not listed below in Known Issues please [report bugs](https://google.com) or [leave a suggestion](here) in github.

## Compatibility

Any microcontroller than can run Arduino code should be compatible with Adafruits GFX library.

| Displays  | Compatibility |
| ---- | ---- |
| OLED96x64  | ✅  |
| OLED128x32  | ✅   |
| OLED128x64  | ✅  |
| OLED128x128  | ✅  |
| OLED170x320  | ✅  |
| LCD128X128  | ✅  |
| LCD128X160  | ✅  |
| LCD220x176  | ✅  |
| LCD240X320  | ✅  |
| LCD480x320  | ✅  |
| LED Matrix  | ❌  |
| I2C Backpack  | ❌  |

If you don't see the display you are using above, but there is a Adafruit GFX library for it, the program will still work. You will just need to fill out the dimensions and name of the library manually.

## Features

- Choose from all 86 compatible display sizes (or create a custom size)
- Work in black and white or full rgb565 color spectrum
- Easily create all graphics primitives included in Adafruits GFX library
- Update, move, and scale graphics to your liking
- Fix mistakes with undo or completely clear the scene
- Optimize, and generate code for the Arduino IDE
- Create and stylize basic text
- _Upload custom fonts or use fonts included in adafruit library (Coming Soon)_
- _Import previously generated code to continue where you left off (Coming Soon)_
- _Upload images or bitmaps (Coming Soon)_
- _Test changes live by streaming to your device (Coming Eventually)_
- _Create multi-step animations (Coming Eventually)_


## Local Setup

Rust backend is currently not needed for the project to run locally.

For the frontend you must have nodejs+npm installed on your computer.

### Backend (Rust)

```bash
cd backend
cargo run 
```

### Frontend (Sveltekit)

```bash
cd frontend
npm install
npm run dev -- --open 
```
## Known Issues
TODO

## Contributing

If you have a display that is compatible with Adafruit GFX's library but is not included above you can contribute by adding it to _'frontend/src/displayToLib.json'_ in the following format:


```json
  "[ScreenType][Resolution]":
    {
      "lib": "[AdafruitLibrary]",
      "details": "[DisplayType][DisplaySize][ExtraDetails(optional)]"
    }
```
