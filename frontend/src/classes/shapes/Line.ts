import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

class Line extends CanvasOb {
    x1: number; //X Position on display 
    y1: number; //Y Position on display 
    x2: number; //X Position on display 
    y2: number; //Y Position on display 

    constructor(type: shapeType, x1: number, y1: number, x2: number, y2: number, color: HEX) {
        super(Shape.Line, type, color);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    drawCells(cellList: Cell[][]) {
        Line.drawLine(cellList, this.x1, this.y1, this.x2, this.y2, this);
    }
}


export default Line;