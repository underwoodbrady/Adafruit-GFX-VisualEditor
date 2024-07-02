import CanvasOb, { Shape } from "../CanvasOb";
import type { shapeType } from "../CanvasOb";
import type Cell from "../Cell";
import Circle from "../shapes/Circle";
import Triangle from "../shapes/Triangle";


class Heart extends CanvasOb {
    x: number; //X Position on display (from the left)
    y: number; //Y Position on display (from the top)
    w: number; //Width of heart
    h: number; //Height of heart

    constructor(type: shapeType, x: number, y: number, w: number, h: number, color: HEX) {
        super(Shape.Heart, type, color);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    private static readonly CIRCLE_RATIO = 2 / 7;
    private static readonly TRIANGLE_TOP_X_RATIO = 32 / 35;
    private static readonly TRIANGLE_TOP_Y_RATIO = 17 / 35;
    private static readonly TRIANGLE_BOTTOM_X_RATIO = 3 / 35;

    private circleX(isRight: boolean): number {
        return Math.floor(this.x + (isRight ? this.w - this.w * Heart.CIRCLE_RATIO : this.w * Heart.CIRCLE_RATIO));
    }

    private circleY(): number {
        return Math.floor(this.y + this.h * Heart.CIRCLE_RATIO);
    }

    private circleRadius(): number {
        return Math.floor(this.w * Heart.CIRCLE_RATIO);
    }

    //TODO: Get rid of the +1 across multiple classes
    drawCells(cellList: Cell[][]) {
        const leftCircle = new Circle('fill', this.circleX(false), this.circleY(), this.circleRadius(), this.color);
        const rightCircle = new Circle('fill', this.circleX(true), this.circleY(), this.circleRadius(), this.color);
        const triangle = new Triangle(
            'fill',
            Math.floor(this.x + this.w / 2),
            this.y + this.h,
            Math.floor(this.x + this.w * Heart.TRIANGLE_TOP_X_RATIO),
            Math.floor(this.y + this.h * Heart.TRIANGLE_TOP_Y_RATIO),
            Math.floor(this.x + this.w * Heart.TRIANGLE_BOTTOM_X_RATIO),
            Math.floor(this.y + this.h * Heart.TRIANGLE_TOP_Y_RATIO),
            this.color
        );

        [leftCircle, rightCircle, triangle].forEach(shape => shape.drawCells(cellList, this));
    }
}

export default Heart;