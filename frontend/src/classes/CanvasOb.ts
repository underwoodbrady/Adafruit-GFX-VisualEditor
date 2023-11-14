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
    color: HEX;

    constructor(shape:shapes, type:shapeType, color: HEX){
        this.shape = shape;
        this.type = type;
        this.color = color;
    }

    printFormatted(){
        //implement
    }
}

export default CanvasOb;