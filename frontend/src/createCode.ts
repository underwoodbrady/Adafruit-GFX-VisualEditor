import codeFormat from "./codeFormat.txt";
import codeONLYFormat from "./codeONLYFormat.txt";
import type CanvasOb from "./classes/CanvasOb";


//TODO: Make optimize function when shapes are fully overlapping
let optimizeObjects = (objects: CanvasOb[]) => {

}


//TODO: Convert object.color to format arduino can understand
let convertObjectsToCode = (object: CanvasOb): string => {
    let returnString: string = "";
    switch (object.shape) {
        case "circle":
            if (object.type == 'fill') {
                returnString = `void fillCircle(uint16_t x0, uint16_t y0, uint16_t r, uint16_t color);`
            } else if (object.type = 'outline') {
                returnString =`void drawCircle(uint16_t x0, uint16_t y0, uint16_t r, uint16_t color);`
            }
            break;
        case "rect":
            if (object.type == 'fill') {
                returnString = `lib.fillRect(${object.x}, ${object.y}, ${object.w}, ${object.h}, '${object.color}');`
            } else if (object.type = 'outline') {
                returnString =`lib.drawRect(${object.x}, ${object.y}, ${object.w}, ${object.h}, '${object.color}');`
            }
            break;
        case "triangle":
            break;
        case "round-rect":
            break;
        case "line":
            break;
        case "dot":
            break;
    }
    console.log(returnString)
    return `    ${returnString}`;
}

export const createFullCode = async (displayLibrary: string, customFontImports: string[], customColorDefinitions: string[], objectList: CanvasOb[]) => {
    let newLines:string[] = [];
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
                            line = "//Add specific library import"
                            break;
                        case 1:
                            line = "//Add specific font imports"
                            break;
                        case 2:
                            if (customColorDefinitions)
                                line = customColorDefinitions.join('\n');
                            else line = ""
                            break;
                        case 3:
                            line = (objectList.map((object) => convertObjectsToCode(object))).join("\n")
                            break;
                        default:
                            throw Error("No Bueno")
                    }
                    injected++
                }
                newLines.push(line);
            }
        })

    return newLines.join("\n");
}
