import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class Line extends CanvasOb {
    x1: number; //X Position on display 
    y1: number; //Y Position on display 
    x2: number; //X Position on display 
    y2: number; //Y Position on display 

    constructor(type: shapeType, x1: number, y1: number, x2: number, y2: number, color: HEX) {
        super("line", type, color);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    //TODO: Simplify, this is probably way over-engineered
    drawCells(cellList: Cell[][]) {
        let slope = (this.y2 - this.y1) / (this.x2 - this.x1); //Gotta remember the grid goes down instead of up
        let xSlope = (this.x2 - this.x1) / (this.y2 - this.y1); //Gotta remember the grid goes down instead of up
        let quadrant: number = (slope > 0) ? (this.x1 < this.x2) ? 2 : 4 : (this.x1 < this.x2) ? 1 : 3;
        let vertical: boolean = Math.abs(slope) > 1;

        console.log(xSlope, slope, quadrant);

        if (vertical) {
            switch (quadrant) {
                case 1:
                case 4:
                    for (let x: number = this.x1, y = this.y1; y > this.y2; y--, x -= xSlope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = this.color;
                        cell._object = this;
                    }
                    break;
                case 2:
                case 3:
                    for (let x: number = this.x1, y = this.y1; y < this.y2; y++, x += xSlope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = this.color;
                        cell._object = this;
                    }
                    break;
            }
        } else {
            switch (quadrant) {
                case 1:
                case 2:
                    for (let x: number = this.x1, y = this.y1; x < this.x2; x++, y += slope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = this.color;
                        cell._object = this;
                    }
                    break;
                case 3:
                case 4:
                    for (let x: number = this.x1, y = this.y1; x > this.x2; x--, y -= slope) {
                        let cell = cellList[Math.round(y)][Math.round(x)];
                        cell.color = this.color;
                        cell._object = this;
                    }
                    break;
            }
        }

    }
}


export default Line;