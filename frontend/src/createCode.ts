import codeFormat from "./utils/codeFormat.txt";
import codeONLYFormat from "./utils/codeONLYFormat.txt";
import type displayToLib from "./utils/displayToLib.json";
import defaultLabelColors from "./utils/defaultLabelColors.json";
import type CanvasOb from "./classes/CanvasOb";
import type Rect from "./classes/shapes/Rect";
import type Circle from "./classes/shapes/Circle";
import type Triangle from "./classes/shapes/Triangle";
import type RoundRect from "./classes/shapes/RoundRect";
import type Line from "./classes/shapes/Line";
import type Dot from "./classes/shapes/Dot";
import type Text from "./classes/shapes/Text";


type display = keyof typeof displayToLib;

//TODO: Make optimize function when shapes are fully overlapping
let optimizeObjects = (objects: CanvasOb[]) => {

}

/*
Formatted:

'hex':
{
    'rgb565',
    'label',
}
*/

//TODO: Create type
let colors: any = {
    
}

//The gift of chatgpt
function convertHexToRGB565(hexColor:string) {
    // Remove the '#' symbol from the hex color
    hexColor = hexColor.replace('#', '');
  
    // Convert the hex color to RGB values
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate the RGB565 value
    const r5 = (r >> 3) & 0x1F;
    const g6 = (g >> 2) & 0x3F;
    const b5 = (b >> 3) & 0x1F;
  
    // Generate the RGB565 value in hexadecimal format
    return '0x' + ((r5 << 11) | (g6 << 5) | b5).toString(16).toUpperCase();
  }

let extractColors = (objects:CanvasOb[]) => {
    let numColors = 0; //TODO: Could just use .length instead
    colors = {}
    for(let x:number = 0, l:number = objects.length; x<l; x++){
        let currentOb = objects[x]

        if(colors[`${currentOb.color}`]) continue;

        let currentRGB565 = convertHexToRGB565(currentOb.color);
        let currentLabel =  defaultLabelColors[currentRGB565 as keyof typeof defaultLabelColors] || `CUSTOM${numColors}`;
        numColors++;
        
        colors[`${currentOb.color}`] ={
            'rgb565': `${currentRGB565}`,
            'label' : `${currentLabel}`
        };
    }
    console.log(colors);
}

//TODO: Convert object.color to format arduino can understand
let convertObjectsToCode = (object: CanvasOb): string => {
    let returnString: string = "";
    let obj;
    let color = colors[object.color]['label'];
    switch (object.shape) {
        case "circle":
            obj = (object as Circle); //Probably bad practice
            if (object.type == 'fill') { //Can do inline '?' if statement instead (hurt readability?)
                returnString = `lib.fillCircle(${obj.x}, ${obj.y}, ${obj.r}, ${color});`
            } else if (object.type = 'outline') {
                returnString =`lib.drawCircle(${obj.x}, ${obj.y}, ${obj.r}, ${color});`
            }
            break;
        case "rect":
            obj = (object as Rect); //Probably bad practice
            if (obj.type == 'fill') {
                returnString = `lib.fillRect(${obj.x}, ${obj.y}, ${obj.w}, ${obj.h}, ${color});`
            } else if (obj.type = 'outline') {
                returnString =`lib.drawRect(${obj.x}, ${obj.y}, ${obj.w}, ${obj.h}, ${color});`
            }
            break;
        case "triangle":
            obj = (object as Triangle); //Probably bad practice
            if (obj.type == 'fill') {
                returnString = `lib.fillTriangle(${obj.x1}, ${obj.y1}, ${obj.x2}, ${obj.y2},${obj.x3}, ${obj.y3}, ${color});`
            } else if (obj.type = 'outline') {
                returnString =`lib.drawTriangle(${obj.x1}, ${obj.y1}, ${obj.x2}, ${obj.y2},${obj.x3}, ${obj.y3}, ${color});`
            }
            break;
        case "round-rect":
            obj = (object as RoundRect); //Probably bad practice
            if (obj.type == 'fill') {
                returnString = `lib.fillRoundRect(${obj.x}, ${obj.y}, ${obj.w}, ${obj.h}, ${obj.r}, ${color});`
            } else if (obj.type = 'outline') {
                returnString =`lib.drawRoundRect(${obj.x}, ${obj.y}, ${obj.w}, ${obj.h}, ${obj.r}, ${color});`
            }
            break;
        case "line":
            obj = (object as Line); //Probably bad practice
            returnString = `lib.drawLine(${obj.x1}, ${obj.y1}, ${obj.x2}, ${obj.y2}, ${color});`
            break;
        case "dot":
            obj = (object as Dot); //Probably bad practice
            returnString = `lib.drawPixel(${obj.x}, ${obj.y}, ${color});`
            break;
        case "text":
                obj = (object as Text); //Probably bad practice
                returnString = `lib.setCursor(${obj.x}, ${obj.y});
    lib.setTextColor(${color});
    lib.print("${obj.text}")`
            break;
    }
    console.log(returnString)
    return `    ${returnString}`;
}

export const createFullCode = async (displayLib: string, customFontImports: string[], objectList: CanvasOb[]) => {
    let newLines:string[] = [];
    extractColors(objectList)
    await fetch(codeFormat)
        .then((response) => response.text())
        .then((result) => {
            const resultLines = result.split("\n")
            let injected = 0;
            for (let i: number = 0, numLines: number = resultLines.length; i < numLines; i++) {
                let line = resultLines[i];
                if (line.includes("`")) {
                    switch (injected) {
                        case 0:
                            line = `#include <${displayLib}> // Display specific library`
                            break;
                        case 1:
                            //TODO: Add specific font imports
                            line = ""
                            break;
                        case 2:
                            line = (Object.keys(colors).map((color:any) => `#define ${colors[color]['label']}    ${colors[color]['rgb565']}`)).join("\n")
                            break;
                        case 3:
                            line = `${displayLib.slice(0,-2)} lib = ${displayLib.slice(0,-2)}('PINS HERE');`
                            break;
                        case 4:
                            line = (objectList.map((object) => convertObjectsToCode(object))).join("\n")
                            break;
                        default:
                            throw Error("No está chido")
                    }
                    injected++
                }
                newLines.push(line);
            }
        })

    return newLines.join("\n");
}
