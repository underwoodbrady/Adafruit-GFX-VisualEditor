import CanvasOb from "../CanvasOb";
type shapeType = 'fill' | 'outline';
type HEX = `#${string}`;

class Rect extends CanvasOb{
    x:number;
    y:number;
    w:number; 
    h:number;
    constructor(type: shapeType, x:number, y:number, w:number, h:number, color: HEX){
        super("rect", type, x, y, w, h, color); //Can get rid of the x,y,w,h
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}