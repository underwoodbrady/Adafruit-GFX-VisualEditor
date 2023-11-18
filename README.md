![Visual Editor Logo](https://i.imgur.com/VhjikA2.png)

<p align="center">
    <a href="https://www.chartjs.org/docs/latest/getting-started/installation.html"><img src="https://img.shields.io/github/release/chartjs/Chart.js.svg?style=flat-square&maxAge=600" alt="Downloads"></a>
    <a href="https://github.com/chartjs/Chart.js/actions?query=workflow%3ACI+branch%3Amaster"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/chartjs/Chart.js/ci.yml?branch=master&style=flat-square"></a>
</p>

<h1 align="center">Graphics to Code Editor for Adafruit GFX</h1>

Adafruit GFX Visual Editor is an online HTML canvas based visual editing software that converts your designs directly into Arduino code compatible with most microcontrollers and displays. 

It is available online for free [here](https://pocket.montana.icu/auth/register) or you can run on your own computer using steps outlined in Local Setup. 

## Compatibility

| Displays  | Compatibility |
| ---- | ---- |
| TBD  | ✅  |
| TBD  | ❌  |

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
## Roadmap
TODO
