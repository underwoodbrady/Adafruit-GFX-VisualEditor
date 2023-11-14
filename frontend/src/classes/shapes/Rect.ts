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

    drawCells(cellList: Cell[][]) {
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
                if (this.type == "fill") {
                    cell.color = this.color;
                    cell.object = this;
                } else if (
                    this.type == "outline" &&
                    (cellNum == this.x ||
                        cellRowNum == this.y ||
                        cellNum == cellNumMax ||
                        cellRowNum == cellRowMax)
                ) {
                    cell.color = this.color;
                    cell.object = this;
                }
            }
        }
    }
}

export default Rect;