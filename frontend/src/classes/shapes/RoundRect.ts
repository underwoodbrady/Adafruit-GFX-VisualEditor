import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

class RoundRect extends CanvasOb {
    x: number; //X Position on display (from the middle)
    y: number; //Y Position on display (from the middle)
    w: number;
    h: number;
    r: number; //Radius of Circle

    constructor(type: shapeType, x: number, y: number, w: number, h: number, r: number, color: HEX) {
        super(Shape.RoundRect, type, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
    }

    drawCells(cellList: Cell[][]) {
        if (this.type == 'fill') {
            this.drawRect(cellList, this.x + this.r, this.y, this.w - (this.r * 2), this.h)
            this.drawRect(cellList, this.x, this.y + this.r, this.r, this.h - (this.r * 2))
            this.drawRect(cellList, this.x + this.w - this.r, this.y + this.r, this.r, this.h - (this.r * 2))
            this.drawQuarterCircle(cellList, this.x, this.y, this.r+1, 1)
            this.drawQuarterCircle(cellList, this.x + this.w, this.y, this.r+1, 2)
            this.drawQuarterCircle(cellList, this.x + this.w, this.y + this.h, this.r+1, 3)
            this.drawQuarterCircle(cellList, this.x, this.y + this.h, this.r+1, 4)
        }
        else {
            CanvasOb.drawHLine(cellList, this.x+this.r, this.y, this.w-(this.r*2), this);
            CanvasOb.drawHLine(cellList, this.x+this.r, this.y+ this.h, this.w-(this.r*2), this);
            CanvasOb.drawVLine(cellList, this.x, this.y+this.r, this.h-(this.r*2), this)
            CanvasOb.drawVLine(cellList, this.x+this.w, this.y+this.r, this.h-(this.r*2), this)
            this.drawQuarterCircle(cellList, this.x, this.y, this.r+1, 1)
            this.drawQuarterCircle(cellList, this.x + this.w, this.y, this.r+1, 2)
            this.drawQuarterCircle(cellList, this.x + this.w, this.y + this.h, this.r+1, 3)
            this.drawQuarterCircle(cellList, this.x, this.y + this.h, this.r+1, 4)
        }

    }

    drawRect(cellList: Cell[][], x: number, y: number, w: number, h: number) {

        for (
            let cellRowNum: number = y,
            cellRowMax = y + h;
            cellRowNum < cellRowMax + 1;
            cellRowNum++
        ) {
            let cellRow = cellList[cellRowNum];
            for (
                let cellNum: number = x,
                cellNumMax: number = x + w;
                cellNum < cellNumMax + 1;
                cellNum++
            ) {
                let cell = cellRow[cellNum];
                cell.color = this.color;
                cell.object = this;
            }
        }
    }

    //TODO: Extract into class
    drawQuarterCircle(cellList: Cell[][], x: number, y: number, r: number, q: number) {
        let minY, maxY, minX, maxX;
        switch (q) {
            case 1:
                minY = y
                maxY = y + r
                minX = x
                maxX = x + r
                break;
            case 2:
                minY = y
                maxY = y + r
                minX = x - r
                maxX = x
                break;
            case 3:
                minY = y - r
                maxY = y
                minX = x - r
                maxX = x
                break;
            case 4:
                minY = y - r
                maxY = y
                minX = x
                maxX = x + r
                break;
            default:
                minY = y
                maxY = y + r
                minX = x
                maxX = x + r
                break;
        }
        for (
            let cellRowNum: number = minY,
            cellRowMax = maxY;
            cellRowNum < cellRowMax + 1;
            cellRowNum++
        ) {
            let cellRow = cellList[cellRowNum];
            for (
                let cellNum: number = minX,
                cellNumMax: number = maxX;
                cellNum < cellNumMax + 1;
                cellNum++
            ) {
                let cell = cellRow[cellNum];
                let dx, dy;
                switch (q) {
                    case 1:
                        dx = maxX - cellNum;
                        dy = maxY - cellRowNum;
                        break;
                    case 2:
                        dx = minX - cellNum;
                        dy = maxY - cellRowNum;
                        break;
                    case 3:
                        dx = minX - cellNum;
                        dy = minY - cellRowNum;
                        break;
                    case 4:
                        dx = maxX - cellNum;
                        dy = minY - cellRowNum;
                        break;
                    default:
                        dx = minX - cellNum;
                        dy = maxY - cellRowNum;
                        break;
                }
                let distance = Math.sqrt(dx * dx + dy * dy);


                if (distance < r) {
                    if (this.type == "fill") {
                        cell.color = this.color;
                        cell.object = this;
                    } else if (
                        this.type == "outline" &&
                        Math.abs(distance - r) <= 1
                    ) {
                        cell.color = this.color;
                        cell.object = this;
                    }
                }

            }
        }
    }
}

export default RoundRect;