import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

class HorizontalLine extends CanvasOb {
    x: number; //X Position on display 
    y: number; //Y Position on display 
    l: number;

    constructor(type: shapeType, x:number, y:number, l:number, color: HEX) {
        super(Shape.HLine, type, color);
        this.x = x;
        this.y = y;
        this.l = l;
    }

    drawCells(cellList: Cell[][]) {
        CanvasOb.drawHLine(cellList, this.x, this.y, this.l, this);
    }
}


export default HorizontalLine;