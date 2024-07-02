import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

class Circle extends CanvasOb {
    x: number; //X Position on display (from the middle)
    y: number; //Y Position on display (from the middle)
    r: number; //Radius of Circle

    constructor(type: shapeType, x: number, y: number, r: number, color: HEX) {
        super(Shape.Circle, type, color); 
        this.x = x;
        this.y = y;
        this.r = r;
    }

    drawCells(cellList: Cell[][], altRef?:CanvasOb) {
        let referenceOb = altRef || this;
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
                        cell.object = referenceOb;
                    } else if (
                        this.type == "outline" &&
                        Math.abs(distance-this.r) <=1
                    ) {
                        cell.color = this.color;
                        cell.object = referenceOb;
                    }
                }

            }
        }
    }
}

export default Circle;