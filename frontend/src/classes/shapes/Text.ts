import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

let defaultFontBitmap = [
    0x3E, 0x51, 0x49, 0x45, 0x3E,
    0x00, 0x42, 0x7F, 0x40, 0x00,
    0x72, 0x49, 0x49, 0x49, 0x46,
    0x21, 0x41, 0x49, 0x4D, 0x33,
    0x18, 0x14, 0x12, 0x7F, 0x10,
    0x27, 0x45, 0x45, 0x45, 0x39,
    0x3C, 0x4A, 0x49, 0x49, 0x31,
    0x41, 0x21, 0x11, 0x09, 0x07,
    0x36, 0x49, 0x49, 0x49, 0x36,
    0x46, 0x49, 0x49, 0x29, 0x1E,
    0x00, 0x00, 0x14, 0x00, 0x00,
    0x00, 0x40, 0x34, 0x00, 0x00,
    0x00, 0x08, 0x14, 0x22, 0x41,
    0x14, 0x14, 0x14, 0x14, 0x14,
    0x00, 0x41, 0x22, 0x14, 0x08,
    0x02, 0x01, 0x59, 0x09, 0x06,
    0x3E, 0x41, 0x5D, 0x59, 0x4E,
    0x7C, 0x12, 0x11, 0x12, 0x7C,
    0x7F, 0x49, 0x49, 0x49, 0x36,
    0x3E, 0x41, 0x41, 0x41, 0x22,
    0x7F, 0x41, 0x41, 0x41, 0x3E,
    0x7F, 0x49, 0x49, 0x49, 0x41,
    0x7F, 0x09, 0x09, 0x09, 0x01,
    0x3E, 0x41, 0x41, 0x51, 0x73,
    0x7F, 0x08, 0x08, 0x08, 0x7F,
    0x00, 0x41, 0x7F, 0x41, 0x00,
    0x20, 0x40, 0x41, 0x3F, 0x01,
    0x7F, 0x08, 0x14, 0x22, 0x41,
    0x7F, 0x40, 0x40, 0x40, 0x40,
    0x7F, 0x02, 0x1C, 0x02, 0x7F,
    0x7F, 0x04, 0x08, 0x10, 0x7F,
    0x3E, 0x41, 0x41, 0x41, 0x3E,
    0x7F, 0x09, 0x09, 0x09, 0x06,
    0x3E, 0x41, 0x51, 0x21, 0x5E,
    0x7F, 0x09, 0x19, 0x29, 0x46,
    0x26, 0x49, 0x49, 0x49, 0x32,
    0x03, 0x01, 0x7F, 0x01, 0x03,
    0x3F, 0x40, 0x40, 0x40, 0x3F,
    0x1F, 0x20, 0x40, 0x20, 0x1F,
    0x3F, 0x40, 0x38, 0x40, 0x3F,
    0x63, 0x14, 0x08, 0x14, 0x63,
    0x03, 0x04, 0x78, 0x04, 0x03,
    0x61, 0x59, 0x49, 0x4D, 0x43,
    0x00, 0x7F, 0x41, 0x41, 0x41,
    0x02, 0x04, 0x08, 0x10, 0x20,
    0x00, 0x41, 0x41, 0x41, 0x7F,
    0x04, 0x02, 0x01, 0x02, 0x04,
    0x40, 0x40, 0x40, 0x40, 0x40,
    0x00, 0x03, 0x07, 0x08, 0x00,
    0x20, 0x54, 0x54, 0x78, 0x40,
    0x7F, 0x28, 0x44, 0x44, 0x38,
    0x38, 0x44, 0x44, 0x44, 0x28,
    0x38, 0x44, 0x44, 0x28, 0x7F,
    0x38, 0x54, 0x54, 0x54, 0x18,
    0x00, 0x08, 0x7E, 0x09, 0x02,
    0x18, 0xA4, 0xA4, 0x9C, 0x78,
    0x7F, 0x08, 0x04, 0x04, 0x78,
    0x00, 0x44, 0x7D, 0x40, 0x00,
    0x20, 0x40, 0x40, 0x3D, 0x00,
    0x7F, 0x10, 0x28, 0x44, 0x00,
    0x00, 0x41, 0x7F, 0x40, 0x00,
    0x7C, 0x04, 0x78, 0x04, 0x78,
    0x7C, 0x08, 0x04, 0x04, 0x78,
    0x38, 0x44, 0x44, 0x44, 0x38,
    0xFC, 0x18, 0x24, 0x24, 0x18,
    0x18, 0x24, 0x24, 0x18, 0xFC,
    0x7C, 0x08, 0x04, 0x04, 0x08,
    0x48, 0x54, 0x54, 0x54, 0x24,
    0x04, 0x04, 0x3F, 0x44, 0x24,
    0x3C, 0x40, 0x40, 0x20, 0x7C,
    0x1C, 0x20, 0x40, 0x20, 0x1C,
    0x3C, 0x40, 0x30, 0x40, 0x3C,
    0x44, 0x28, 0x10, 0x28, 0x44,
    0x4C, 0x90, 0x90, 0x90, 0x7C,
    0x44, 0x64, 0x54, 0x4C, 0x44,
    0x00, 0x00, 0x00, 0x00, 0x00,
];

let mapCharToIndex:any = {
    '0': 0,
    '1': 5,
    '2': 10,
    '3': 15,
    '4': 20,
    '5': 25,
    '6': 30,
    '7': 35,
    '8': 40,
    '9': 45,
    ':': 50,
    ';': 55,
    '<': 60,
    '=': 65,
    '>': 70,
    '?': 75,
    '@': 80,
    'A': 85,
    'B': 90,
    'C': 95,
    'D': 100,
    'E': 105,
    'F': 110,
    'G': 115,
    'H': 120,
    'I': 125,
    'J': 130,
    'K': 135,
    'L': 140,
    'M': 145,
    'N': 150,
    'O': 155,
    'P': 160,
    'Q': 165,
    'R': 170,
    'S': 175,
    'T': 180,
    'U': 185,
    'V': 190,
    'W': 195,
    'X': 200,
    'Y': 205,
    'Z': 210,
    '[': 215,
    '/': 220,
    ']': 225,
    '^': 230,
    '_': 235,
    '"': 240,
    'a': 245,
    'b': 250,
    'c': 255,
    'd': 260,
    'e': 265,
    'f': 270,
    'g': 275,
    'h': 280,
    'i': 285,
    'j': 290,
    'k': 295,
    'l': 300,
    'm': 305,
    'n': 310,
    'o': 315,
    'p': 320,
    'q': 325,
    'r': 330,
    's': 335,
    't': 340,
    'u': 345,
    'v': 350,
    'w': 355,
    'x': 360,
    'y': 365,
    'z': 370,
    ' ': 375,
}

let allowedChars = Object.keys(mapCharToIndex);

class Text extends CanvasOb {
    x: number; //X Position on display 
    y: number; //Y Position on display 
    text: string;
    scale: number;

    constructor(x: number, y: number, text: string = "", color: HEX,  scale:number = 1) {
        super(Shape.Text, 'fill', color);
        this.x = x;
        this.y = y;
        this.text = text;
        this.scale = scale;
    }

    //Optimize this function with help of original Adafruit code 
    //TODO: Fix scales for greater than 2
    drawCells(cellList: Cell[][]) {
        if (this.text.length == 0) return
        this.text = this.text.split("").filter((char) => allowedChars.indexOf(char) > -1).join(""); //Filter text to only allowed characters TODO:Do on frontend as well

        const startingX = this.x,
              startingY = this.y;

        const fontWidth = 5 *this.scale;
        const fontHeight = 7 *this.scale;

        let currentX = startingX,
            currentY = startingY;

        let currentChar;
        let currentLetter;
        let scaleBitmap;
        for (let i = 0, textLen = this.text.length; i < textLen; i++) {
            currentX = i * fontWidth + startingX;
            currentY = startingY;
            currentChar = this.text[i];
            let bitMapLocation = mapCharToIndex[currentChar];
            let letterCount = 0; //TODO: Can remove
            for(let x=currentX; x<currentX+fontWidth; x+=this.scale){
                currentLetter =(('0000000' + defaultFontBitmap[(bitMapLocation+letterCount)].toString(2)).substr(-7)).split("")
                letterCount++;
                let heightCount = 0; //TODO: Can remove
                for(let y=currentY; y<currentY+fontHeight; y+=this.scale){
                    if(currentLetter[6-heightCount] == '1')
                    {
                        for(let scaleX =0; scaleX<this.scale; scaleX++){
                            cellList[y][x+scaleX].color = this.color;
                            cellList[y][x+scaleX].object = this;
                        }
                        for(let scaleY =0; scaleY<this.scale; scaleY++){
                            cellList[y+scaleY][x].color = this.color;
                            cellList[y+scaleY][x].object = this;
                        }
                        for(let diag =0; diag<this.scale; diag++){
                            cellList[y+diag][x+diag].color = this.color;
                            cellList[y+diag][x+diag].object = this;
                        }
                    }
                    heightCount++;
                }
            }

        }
    }
}


export default Text;