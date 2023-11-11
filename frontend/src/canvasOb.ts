type shapes = 'circle' | 'rect' | 'triangle' | 'round-rect' | 'line' | 'dot';
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

/**
 * TODO:Add documentation
 * 
 */
class CanvasOb{
    shape: shapes;
    type: shapeType;
    x:number;
    y:number;
    w:number; 
    h:number;
    color: HEX;

    constructor(shape:shapes, type:shapeType, x:number, y:number, w:number, h:number, color: HEX){
        this.shape = shape;
        this.type = type;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
}

export default CanvasOb;