import type Cell from "./Cell";

export enum Shape {
    Circle = 'circle',
    Rect = 'rect',
    Triangle = 'triangle',
    RoundRect = 'round-rect',
    Line = 'line',
    Dot = 'dot',
    HLine = 'h-line',
    VLine = 'v-line',
    Text = 'text',
    Star = 'star',
    Heart = 'heart',
    Polygon = 'polygon',
}
export type shapeType = 'fill' | 'outline';

/**
 * Represents a canvas object with shape, type, and color properties.
 */
class CanvasOb{
    readonly id: number;
    private static nextId = 0;

    shape: Shape;
    type: shapeType;
    color: HEX;

    constructor(shape:Shape, type:shapeType, color: HEX){
        this.id = CanvasOb.nextId++;
        this.shape = shape;
        this.type = type;
        this.color = color;
    }

    /** Utility Functions */

    static drawHLine(cellList: Cell[][], x:number, y:number, l:number, ref:CanvasOb){
        for(let currentX:number = x; currentX< l+x; currentX++){
            let cell = cellList[y][currentX];
            cell.color = ref.color;
            cell.object = ref;
        }
    }

    static drawVLine(cellList: Cell[][], x:number, y:number, l:number, ref:CanvasOb){
        for(let currentY:number = y; currentY< l+y; currentY++){
            let cell = cellList[currentY][x];
            cell.color = ref.color;
            cell.object = ref;
        }
    }
    
    static drawLine(cellList: Cell[][], x1:number, y1:number, x2:number, y2:number, ref:CanvasOb){
        const slope = (y2 - y1) / (x2 - x1); //Gotta remember the grid goes down instead of up
        const xSlope = (x2 - x1) / (y2 - y1); //Gotta remember the grid goes down instead of up
        const quadrant: number = (slope > 0) ? (x1 < x2) ? 2 : 4 : (x1 < x2) ? 1 : 3;
        const vertical: boolean = Math.abs(slope) > 1;

        if (vertical) {
            switch (quadrant) {
                case 1:
                case 4:
                    for (let x: number = x1, y = y1; y >= y2; y--, x -= xSlope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = ref.color;
                        cell.object = ref;
                    }
                    break;
                case 2:
                case 3:
                    for (let x: number = x1, y = y1; y <= y2; y++, x += xSlope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = ref.color;
                        cell.object = ref;
                    }
                    break;
            }
        } else {
            switch (quadrant) {
                case 1:
                case 2:
                    for (let x: number = x1, y = y1; x <= x2; x++, y += slope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = ref.color;
                        cell.object = ref;
                    }
                    break;
                case 3:
                case 4:
                    for (let x: number = x1, y = y1; x >= x2; x--, y -= slope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = ref.color;
                        cell.object = ref;
                    }
                    break;
            }
        }
    }
    
    //Implement for each child class
    drawCells(cellList: Cell[][], altRef?:CanvasOb) : void {
        throw new Error("Method not implemented.");
    }

    stringFormatted() : string{
        return `${this.shape.charAt(0)?.toUpperCase() + this.shape.slice(1)}  (${this.type})`;
    }
}

export default CanvasOb;
export type {CanvasOb};
