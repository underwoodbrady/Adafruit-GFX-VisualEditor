import CanvasOb from "../CanvasOb";
import type Cell from "../Cell";
import Circle from "../shapes/Circle";
import Triangle from "../shapes/Triangle";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class Heart extends CanvasOb {
    x: number; //X Position on display (from the left)
    y: number; //Y Position on display (from the top)
    w: number; //Width of heart
    h: number; //Height of heart

    constructor(type: shapeType, x: number, y: number, w: number, h: number, color: HEX) {
        super("heart", type, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    //TODO: Get rid of the +1 across multiple classes
    //TODO: Use math.floor or math.ceil instead of round across codebase (but be consistent)
    drawCells(cellList: Cell[][]) {
        let c1 = new Circle('fill',Math.floor(this.x+(this.w*2/7)),Math.floor(this.y+(this.h*2/7)), Math.floor((this.w*2/7)), this.color)
        c1.drawCells(cellList);
        let c2 = new Circle('fill',Math.floor(this.x+this.w-(this.w*2/7)),Math.floor(this.y+(this.h*2/7)), Math.floor((this.w*2/7)), this.color)
        c2.drawCells(cellList);
        let t1 = new Triangle('fill',Math.floor(this.x+(this.w/2)),this.y+this.h, Math.floor(this.x+(this.w*32/35)), Math.floor(this.y+(this.h*17/35)), Math.floor(this.x+(this.w*3/35)), Math.floor(this.y+(this.h*17/35)), this.color);
        t1.drawCells(cellList);
        c1 = c2 = t1 = null;
    }
}

export default Heart;