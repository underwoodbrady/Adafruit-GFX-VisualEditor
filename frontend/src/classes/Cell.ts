import type {CanvasOb} from "./CanvasOb";

/**
 * Represents a single pixel on the display grid and its corresponding properties
 * 
 */
class Cell {
    readonly x: number;
    readonly y: number;
    readonly size: number;

    color: HEX;
    private _object: CanvasOb | undefined;

    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = "#";
    }

    get object() {
        return this._object;
    }

    /**Might want to add logic eventually */
    set object(value) {
        this._object = value;
    }
}

export default Cell;