import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class Circle extends CanvasOb {
    x: number;
    y: number;
    r: number;

    constructor(type: shapeType, x: number, y: number, r: number, color: HEX) {
        super("circle", type, color); //Can get rid of the x,y,w,h
        this.x = x;
        this.y = y;
        this.r = r;
    }

    drawCells(cellList: Cell[][]) {
        for (
            let cellRowNum: number = this.y-this.r,
            cellRowMax = this.y+this.r;
            cellRowNum < cellRowMax + 1;
            cellRowNum++
        ) {
            let cellRow = cellList[cellRowNum];
            for (
                let cellNum: number = this.x-this.r,
                cellNumMax: number = this.x+this.r;
                cellNum < cellNumMax + 1;
                cellNum++
            ) {
                let cell = cellRow[cellNum];
                let dx = this.x - cellNum;
                let dy = this.y - cellRowNum;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.r) {
                    if (this.type == "fill") {
                        cell.color = this.color;
                        cell.object = this;
                    } else if (
                        this.type == "outline" &&
                        Math.abs(distance-this.r) <=1
                    ) {
                        cell.color = this.color;
                        cell.object = this;
                    }
                }

            }
        }
    }
}

export default Circle;