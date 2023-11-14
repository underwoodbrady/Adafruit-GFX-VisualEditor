import codeFormat from "./codeFormat.txt";
import codeONLYFormat from "./codeONLYFormat.txt";
import type CanvasOb from "./classes/CanvasOb";
import type Rect from "./classes/shapes/Rect";
import type Circle from "./classes/shapes/Circle";


//TODO: Make optimize function when shapes are fully overlapping
let optimizeObjects = (objects: CanvasOb[]) => {

}


//TODO: Convert object.color to format arduino can understand
let convertObjectsToCode = (object: CanvasOb): string => {
    let returnString: string = "";
    let obj;
    switch (object.shape) {
        case "circle":
            obj = (object as Circle); //Probably bad practice
            if (object.type == 'fill') {
                returnString = `lib.fillCircle(${obj.x}, ${obj.y}, ${obj.r}, '${obj.color}');`
            } else if (object.type = 'outline') {
                returnString =`lib.drawCircle(${obj.x}, ${obj.y}, ${obj.r}, '${obj.color}');`
            }
            break;
        case "rect":
            obj = (object as Rect); //Probably bad practice
            if (obj.type == 'fill') {
                returnString = `lib.fillRect(${obj.x}, ${obj.y}, ${obj.w}, ${obj.h}, '${obj.color}');`
            } else if (obj.type = 'outline') {
                returnString =`lib.drawRect(${obj.x}, ${obj.y}, ${obj.w}, ${obj.h}, '${obj.color}');`
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
