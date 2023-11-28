import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class Rect extends CanvasOb {
    x: number; //X Position on display (from the left)
    y: number; //Y Position on display (from the top)
    w: number; //Width of rect
    h: number; //Height of rect

    constructor(type: shapeType, x: number, y: number, w: number, h: number, color: HEX) {
        super("rect", type, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    //TODO: Get rid of the +1 across multiple classes
    drawCells(cellList: Cell[][]) {
        if (this.type == 'fill') {
            for (
                let cellRowNum: number = this.y,
                cellRowMax = this.y + this.h;
                cellRowNum < cellRowMax + 1;
                cellRowNum++
            ) {
                let cellRow = cellList[cellRowNum];
                for (
                    let cellNum: number = this.x,
                    cellNumMax: number = this.x + this.w;
                    cellNum < cellNumMax + 1;
                    cellNum++
                ) {
                    let cell = cellRow[cellNum];
                    cell.color = this.color;
                    cell.object = this;
                }
            }
        }
        else {
            this.drawHLine(cellList, this.x,  this.y, this.w, this)
            this.drawHLine(cellList, this.x,  this.y+this.h, this.w+1, this)
            this.drawVLine(cellList, this.x,  this.y, this.h, this)
            this.drawVLine(cellList, this.x+this.w,  this.y, this.h, this)
        }
        
    }
}

export default Rect;