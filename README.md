![Visual Editor Logo](https://i.imgur.com/VhjikA2.png)

<p align="center">
  <img src="https://img.shields.io/github/release/chartjs/Chart.js.svg?style=flat-square&maxAge=600" alt="Downloads">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/chartjs/Chart.js/ci.yml?branch=master&style=flat-square">
</p>

<h1 align="center">Graphics to Arduino Sketches</h1>

Adafruit GFX Visual Editor is an online HTML canvas based visual editing software that converts your designs directly into Arduino code compatible with most microcontrollers and displays. 

It is available [online for free](https://pocket.montana.icu/auth/register) or you can run on your own computer using the steps in Local Setup. We are still in early development so there are plenty of bugs to remove and performance to improve. If not listed below in "Known Issues" please [report bugs](https://google.com) or [leave a suggestion](here) in github.

## Compatibility

Any microcontroller than can run Arduino code should be compatible with Adafruits GFX library _(given there is enough memory)_

| Displays  | Compatibility |
| ---- | ---- |
| TBD  | ✅  |
| TBD  | ❌  |

If you don't see the display you are using above, but there is a Adafruit GFX library for it, the program will still work you just need to fill out the dimensions and name of the library manually.

## Features

- Choose from all 86 compatible display sizes (or create a custom size)
- Work in black and white or full rgb565 color spectrum
- Easily create all graphics primitives included in Adafruits GFX library
- Update, move, and scale graphics to your liking
- Fix mistakes with undo or completely clear the scene
- Optimize, and generate code for the Arduino IDE
- _Create text and upload custom fonts (Coming Soon)_
- _Import previously generated code to continue where you left off (Coming Soon)_
- _Upload images or bitmaps (Coming Soon)_
- _Test changes live by streaming to your device (Coming Soon)_
- _Create multi-step animations (Coming Soon)_


## Local Setup

Rust backend is currently not needed for the project to run locally.

### Backend (Rust)

```bash
cd backend
cargo run 
```

### Frontend (Sveltekit)

```bash
cd frontend
npm run dev -- --open 
```
## Known Issues
TODO
