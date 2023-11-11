import type CanvasOb from "./CanvasOb";

type HEX = `#${string}`;

/**
 * TODO:Add documentation
 * 
 */
class Cell {
    x: number;
    y: number;
    size: number;
    color: HEX;
    _object: CanvasOb | undefined;

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = "#";
    }

    get object() {
        return this._object;
    }

    set object(value) {
        this._object = value;
    }
}

export default Cell;