import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class VerticalLine extends CanvasOb {
    x: number; //X Position on display 
    y: number; //Y Position on display 
    l: number;

    constructor(type: shapeType, x:number, y:number, l:number, color: HEX) {
        super("v-line", type, color);
        this.x = x;
        this.y = y;
        this.l = l;
    }

    drawCells(cellList: Cell[][]) {
        this.drawVLine(cellList, this.x, this.y, this.l, this);
    }
}


export default VerticalLine;