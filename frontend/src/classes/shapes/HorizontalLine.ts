import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class HorizontalLine extends CanvasOb {
    x: number; //X Position on display 
    y: number; //Y Position on display 
    l: number;

    constructor(type: shapeType, x:number, y:number, l:number, color: HEX) {
        super("h-line", type, color);
        this.x = x;
        this.y = y;
        this.l = l;
    }

    drawCells(cellList: Cell[][]) {
        this.drawHLine(cellList, this.x, this.y, this.l, this);
    }
}


export default HorizontalLine;