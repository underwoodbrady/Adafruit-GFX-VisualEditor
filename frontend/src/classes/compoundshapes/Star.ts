import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";


class Star extends CanvasOb {
    x: number; //X Position on display (from the left)
    y: number; //Y Position on display (from the top)
    r: number; // Outer Radius of star

    constructor(type: shapeType, x: number, y: number, r: number, color: HEX) {
        super(Shape.Star, type, color);
        this.x = x;
        this.y = y;
        this.r = r;
    }

    private getStarPoints(): [number, number][] {
        let innerR = this.r * 0.382;
        const points: [number, number][] = [];
        const drawnX = this.x + (this.r),
            drawnY = this.y + (this.r);
        for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? this.r : innerR;
            const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
            const x = drawnX + radius * Math.cos(angle);
            const y = drawnY + radius * Math.sin(angle);
            points.push([Math.round(x), Math.round(y)]);
        }
        return points;
    }

    drawCells(cellList: Cell[][]) {
        const points = this.getStarPoints();
        for (let i = 0; i < points.length; i++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[(i + 1) % points.length];
            CanvasOb.drawLine(cellList, x1, y1, x2, y2, this);
        }
    }
}

export default Star;