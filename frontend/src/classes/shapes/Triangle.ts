import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class Triangle extends CanvasOb {
    x1: number; 
    y1: number;
    x2: number; 
    y2: number;
    x3: number; 
    y3: number;


    constructor(type: shapeType, x1:number, y1:number, x2:number, y2:number, x3:number, y3:number, color: HEX) {
        super("circle", type, color); //Can get rid of the x,y,w,h
        this.x1 = x1;
        this.y1  =y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    drawCells(cellList: Cell[][]) {
        let sign = (p1:any, p2:any, p3:any) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
        let isPointInTriangle = (pt:any) =>{
            const d1 = sign(pt, {x:this.x1, y:this.y1}, {x:this.x2, y:this.y2});
            const d2 = sign(pt, {x:this.x2, y:this.y2}, {x:this.x3, y:this.y3});
            const d3 = sign(pt, {x:this.x3, y:this.y3}, {x:this.x1, y:this.y1});
        
            const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
            const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
        
            return !(hasNeg && hasPos);
        }

        let isPointOnLine = (pt:any, v1:any, v2:any) => {
            const epsilon = 32; // Tolerance to account for floating point errors TODO: Fix this to not be stupid
            const d = sign(pt, v1, v2);
            if (Math.abs(d) > epsilon) return false; // Point is not on the line
        
            // Check if the point pt is between v1 and v2 by projecting it onto the line segment
            const minX = Math.min(v1.x, v2.x);
            const maxX = Math.max(v1.x, v2.x);
            const minY = Math.min(v1.y, v2.y);
            const maxY = Math.max(v1.y, v2.y);
        
            return pt.x >= minX && pt.x <= maxX && pt.y >= minY && pt.y <= maxY;
        }
        
        let checkPointOnTriangleEdges = (pt:any) => {
            if (isPointOnLine(pt, {x:this.x1, y:this.y1}, {x:this.x2, y:this.y2})) return true;
            if (isPointOnLine(pt, {x:this.x2, y:this.y2}, {x:this.x3, y:this.y3})) return true;
            if (isPointOnLine(pt, {x:this.x3, y:this.y3}, {x:this.x1, y:this.y1})) return true;
            return false;
        }
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
                if (this.type == "fill" && isPointInTriangle({x:cellNum, y:cellRowNum})) {
                    cell.color = this.color;
                    cell.object = this;
                } else if (
                    this.type == "outline" &&
                    checkPointOnTriangleEdges({x:cellNum, y:cellRowNum})
                ) {
                    cell.color = this.color;
                    cell.object = this;
                }
            }
        }

    }
}

export default Triangle;