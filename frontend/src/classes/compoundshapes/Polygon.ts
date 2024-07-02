import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";


class Polygon extends CanvasOb {
    x: number; //X Position on display (from the left)
    y: number; //Y Position on display (from the top)
    r:number; // Outer Radius of star
    sides:number;

    constructor(type: shapeType, x: number, y: number, r:number, color: HEX) {
        super(Shape.Polygon, type, color);
        this.x = x;
        this.y = y;
        this.r = r;
        this.sides = 5;
    }

    private getPolygonPoints(): [number, number][] {
        const points: [number, number][] = [];
        for (let i = 0; i < this.sides; i++) {
            const angle = (Math.PI * 2 * i) / this.sides - Math.PI / 2;
            const x = this.x + this.r * Math.cos(angle);
            const y = this.y - this.r * Math.sin(angle);
            points.push([Math.floor(x), Math.floor(y)]);
        }
        return points;
    }

    drawCells(cellList: Cell[][]) {
        const points = this.getPolygonPoints();
        for (let i = 0; i < points.length; i++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[(i + 1) % points.length];
            if(x1 == x2)
                CanvasOb.drawVLine(cellList, x1, y1, y2-y1, this);
            else
                CanvasOb.drawLine(cellList, x1, y1, x2, y2, this);
        }
    }
}

export default Polygon;