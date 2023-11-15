import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class HorizontalLine extends CanvasOb {
    x: number; //X Position on display 
    y: number; //Y Position on display 
    l: number;

    constructor(type: shapeType, x:number, y:number, l:number, color: HEX) {
        super("v-line", type, color);
        this.x = x;
        this.y = y;
        this.l = l;
    }

    drawCells(cellList: Cell[][]) {
        for(let y:number = this.y; y< this.l+this.y; y++){
            let cell = cellList[this.x][y];
            cell.color = this.color;
            cell._object = this;
        }
    }
}


export default HorizontalLine;