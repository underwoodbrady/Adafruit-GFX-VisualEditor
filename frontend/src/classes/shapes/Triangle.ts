import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";

class Triangle extends CanvasOb {
    x1: number; 
    y1: number;
    x2: number; 
    y2: number;
    x3: number; 
    y3: number;


    constructor(type: shapeType, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number, color: HEX) {
        super(Shape.Triangle, type, color);
        this.x1 = x1;
        this.y1  =y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    drawCells(cellList: Cell[][], altRef?:CanvasOb) {
        let referenceOb = altRef || this;
        let sign = (p1:any, p2:any, p3:any) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        let isPointInTriangle = (pt:any) =>{
            const d1 = sign(pt, {x:this.x1, y:this.y1}, {x:this.x2, y:this.y2});
            const d2 = sign(pt, {x:this.x2, y:this.y2}, {x:this.x3, y:this.y3});
            const d3 = sign(pt, {x:this.x3, y:this.y3}, {x:this.x1, y:this.y1});
        
            const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
            const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        
            return !(hasNeg && hasPos);
        }

        if(this.type == 'fill'){
            for (
                let cellRowNum: number = Math.min(this.y1, this.y2, this.y3),
                cellRowMax = Math.max(this.y1, this.y2, this.y3);
                cellRowNum < cellRowMax + 1;
                cellRowNum++
            ) {
                let cellRow = cellList[cellRowNum];
                for (
                    let cellNum: number = Math.min(this.x1, this.x2, this.x3),
                    cellNumMax: number = Math.max(this.x1, this.x2, this.x3);
                    cellNum < cellNumMax + 1;
                    cellNum++
                ) {
                    let cell = cellRow[cellNum];
                    if (isPointInTriangle({x:cellNum, y:cellRowNum})) {
                        cell.color = this.color;
                        cell.object = referenceOb;
                    } 
                }
            }
        }else{
            CanvasOb.drawLine(cellList, this.x1, this.y1, this.x2, this.y2, referenceOb)
            CanvasOb.drawLine(cellList, this.x2, this.y2, this.x3, this.y3, referenceOb)
            CanvasOb.drawLine(cellList, this.x1, this.y1, this.x3, this.y3, referenceOb)
        }
    }
}

export default Triangle;