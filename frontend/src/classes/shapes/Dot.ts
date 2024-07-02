import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

class Dot extends CanvasOb {
    x: number; //X Position on display
    y: number; //Y Position on display

    constructor(type: shapeType, x: number, y: number, color: HEX) {
        super(Shape.Dot, type, color); 
        this.x = x;
        this.y = y;
    }

    drawCells(cellList: Cell[][]) { //Add interpolation?
        cellList[this.y][this.x].color = this.color;
        cellList[this.y][this.x].object = this;
    }
}

export default Dot;