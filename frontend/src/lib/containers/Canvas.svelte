<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { Tools } from "../../routes/tools";
    import type CanvasOb from "../../classes/CanvasOb";
    import Cell from "../../classes/Cell";
    import {
        canvasRedraws,
        objectListStatesWritable,
        objectListWritable,
        selectedObject,
    } from "./objectList";
    import Rect from "../../classes/shapes/Rect";
    import Circle from "../../classes/shapes/Circle";
    import Triangle from "../../classes/shapes/Triangle";
    import Dot from "../../classes/shapes/Dot";
    import Line from "../../classes/shapes/Line";
    import Text from "../../classes/shapes/Text";
    import RoundRect from "../../classes/shapes/RoundRect";
    import Heart from "../../classes/compoundshapes/Heart";
    import Star from "../../classes/compoundshapes/Star";
    // import Polygon from "../../classes/compoundshapes/Polygon";

    export let selectedColor: HEX;
    export let selectedToolName: Tools;
    export let canvasDisplayedWidth: number;
    export let canvasDisplayedHeight: number;
    export let canvasScale: number;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let canvasBoundingRect: DOMRect;

    let cellList: Cell[][] = [];
    let objectList: CanvasOb[] = [];

    /*Implement queue with max length of some number?*/

    let getMousePositions = (
        e: MouseEvent,
    ): { mouseX: number; mouseY: number } => {
        return {
            mouseX: e.clientX - canvasBoundingRect.left,
            mouseY: e.clientY - canvasBoundingRect.top + window.scrollY,
        };
    };

    let updateCanvasBoundingRect = (canvas: HTMLCanvasElement) => {
        canvasBoundingRect = canvas.getBoundingClientRect();
    };

    let startingMouseX: number;
    let startingMouseY: number;

    let mouseDown = (e: MouseEvent) => {
        const { mouseX, mouseY } = getMousePositions(e);
        startingMouseX = mouseX;
        startingMouseY = mouseY;
        if (selectedToolName == "paint-brush") {
            mouseMove(e);
            canvas.onmousemove = (e) => mouseMove(e);
        }
    };

    let addNewObject = (newObject: CanvasOb) => {
        if($objectListStatesWritable[1] == $objectListStatesWritable[0].length-1){
            $objectListStatesWritable[1] = -1
            $objectListStatesWritable = $objectListStatesWritable;
        }else if($objectListStatesWritable[1] != -1){
            objectListStatesWritable.set([[[]],-1]);
        }
        objectList.push(newObject);
        objectListWritable.set(objectList);
        mapObjectToCells(newObject);
        drawCells();
    };

    let mouseUp = (e: MouseEvent) => {
        const { mouseX, mouseY } = getMousePositions(e);
        canvas.onmousemove = null;
        let newObject: CanvasOb | undefined = undefined;

        let cellX = Math.floor(startingMouseX / canvasScale);
        let cellY = Math.floor(startingMouseY / canvasScale);

        let cellWidth = Math.floor((mouseX - startingMouseX) / canvasScale);
        let cellHeight = Math.floor((mouseY - startingMouseY) / canvasScale);

        let widthHeightToRadius = Math.min(
            Math.max(Math.round(cellWidth / 2), Math.round(cellHeight / 2)),
        ); //TODO: Add boundry checking to prevent overflow

        let ob;

        //Error checking
        if (
            cellX < 0 ||
            cellX > canvasDisplayedWidth ||
            cellY < 0 ||
            cellY > canvasDisplayedHeight ||
            cellX + cellWidth > canvasDisplayedWidth ||
            cellY + cellHeight > canvasDisplayedHeight
        )
            return;

        //TODO: Make sure its drawn top left to bottom right too

        switch (selectedToolName) {
            case "rect-open":
                newObject = new Rect(
                    "outline",
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    selectedColor,
                );
                break;
            case "rect-closed":
                newObject = new Rect(
                    "fill",
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    selectedColor,
                );
                break;
            case "round-rect-open":
                newObject = new RoundRect(
                    "outline",
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    Math.round(Math.min(cellWidth, cellHeight) / 8),
                    selectedColor,
                );
                break;
            case "round-rect-closed":
                newObject = new RoundRect(
                    "fill",
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    Math.round(Math.min(cellWidth, cellHeight) / 8),
                    selectedColor,
                );
                break;
            case "circle-open":
                newObject = new Circle(
                    "outline",
                    cellX + widthHeightToRadius,
                    cellY + widthHeightToRadius,
                    widthHeightToRadius,
                    selectedColor,
                );
                break;
            case "circle-closed":
                newObject = new Circle(
                    "fill",
                    cellX + widthHeightToRadius,
                    cellY + widthHeightToRadius,
                    widthHeightToRadius,
                    selectedColor,
                );
                break;
            case "tri-open":
                newObject = new Triangle(
                    "outline",
                    cellX + Math.round(cellWidth / 2),
                    cellY,
                    cellX,
                    cellY + cellHeight,
                    cellX + cellWidth,
                    cellY + cellHeight,
                    selectedColor,
                );
                break;
            case "tri-closed":
                newObject = new Triangle(
                    "fill",
                    cellX + Math.round(cellWidth / 2),
                    cellY,
                    cellX,
                    cellY + cellHeight,
                    cellX + cellWidth,
                    cellY + cellHeight,
                    selectedColor,
                );
                break;
            case "line":
                newObject = new Line(
                    "outline",
                    cellX,
                    cellY,
                    cellX + cellWidth,
                    cellY + cellHeight,
                    selectedColor,
                );
                break;
            case "heart-closed":
                newObject = new Heart(
                    "fill",
                    cellX,
                    cellY,
                    widthHeightToRadius * 2,
                    widthHeightToRadius * 2,
                    selectedColor,
                );
                break;
            case "star-open":
                newObject = new Star(
                    "outline",
                    cellX,
                    cellY,
                    widthHeightToRadius,
                    selectedColor,
                );
                break;
            // case "polygon-open":
            //     newObject = new Polygon(
            //         "outline",
            //         cellX,
            //         cellY,
            //         widthHeightToRadius * 2,
            //         selectedColor,
            //     );
            //     break;
            case "cursor":
                ob = cellList[cellY][cellX].object;
                if (!(ob == undefined)) selectedObject.set(ob);
                return;
            case "text":
                newObject = new Text(cellX, cellY, "", selectedColor, 1);
                selectedObject.set(newObject);
                break;
            case "paint-bucket":
                ob = cellList[cellY][cellX].object;
                if (!(ob == undefined)) {
                    ob.color = selectedColor;
                    fullRedraw(); //TODO: Make more efficient
                } else {
                    newObject = new Rect(
                        "fill",
                        0,
                        0,
                        canvasDisplayedWidth / canvasScale - 1,
                        canvasDisplayedHeight / canvasScale - 1,
                        selectedColor,
                    );
                    objectList.unshift(newObject);
                    objectListWritable.set(objectList);
                    fullRedraw();
                    return; //Don't do normal addNewObject call
                }
                break;
            default:
        }
        if (newObject) addNewObject(newObject);
    };

    //Only define this function if the tool is paint brush
    let mouseMove = (e: MouseEvent) => {
        let { mouseX, mouseY } = getMousePositions(e);
        let newObject = new Dot( //TODO: Add interpolation?
            "outline",
            Math.floor(mouseX / canvasScale),
            Math.floor(mouseY / canvasScale),
            selectedColor,
        );
        if (newObject) addNewObject(newObject);
    };

    //Should only call once
    let createCells = () => {
        for (
            let y: number = 0, i: number = canvasDisplayedHeight;
            y < i;
            y += canvasScale
        ) {
            let cellRow: Cell[] = [];
            for (
                let x: number = 0, e: number = canvasDisplayedWidth;
                x < e;
                x += canvasScale
            ) {
                cellRow.push(new Cell(x, y, canvasScale));
            }
            cellList.push(cellRow);
        }
    };

    //This is probably braindead but oh well
    let resetCells = () => {
        for (
            let cellRowNum: number = 0,
                cellListLength: number = cellList.length;
            cellRowNum < cellListLength;
            cellRowNum++
        ) {
            let cellRow = cellList[cellRowNum];
            for (
                let cellNum: number = 0, cellRowLength: number = cellRow.length;
                cellNum < cellRowLength;
                cellNum++
            ) {
                let cell = cellRow[cellNum];
                cell.color = "#";
                cell.object = undefined;
            }
        }
    };

    //TODO: Can optimize further by only drawing over needed cells
    //Handle objects first
    let drawCells = () => {
        ctx.clearRect(0, 0, canvasDisplayedWidth, canvasDisplayedHeight);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasDisplayedWidth, canvasDisplayedHeight);
        for (
            let cellRowNum: number = 0,
                cellListLength: number = cellList.length;
            cellRowNum < cellListLength;
            cellRowNum++
        ) {
            let cellRow = cellList[cellRowNum];
            for (
                let cellNum: number = 0, cellRowLength: number = cellRow.length;
                cellNum < cellRowLength;
                cellNum++
            ) {
                let cell = cellRow[cellNum];
                if (cell.color == "#") continue;
                else ctx.fillStyle = cell.color;
                //ctx.fillStyle = `rgb(${cellRowNum/cellListLength*255},${cellNum/cellRowLength*255},${125})` //Pretty Gradient
                ctx.fillRect(cell.x, cell.y, cell.size, cell.size);
            }
        }
    };

    let mapAllObjectsToCells = () => {
        for (
            let objectNum: number = 0,
                objectListLength: number = objectList.length;
            objectNum < objectListLength;
            objectNum++
        ) {
            let object = objectList[objectNum];
            mapObjectToCells(object);
        }
    };

    let mapObjectToCells = (object: CanvasOb) => {
        object.drawCells(cellList);
    };

    //Fully redraws canvas
    let fullRedraw = () => {
        console.log("redraw");
        resetCells();
        mapAllObjectsToCells();
        drawCells();
    };

    onMount(() => {
        const res = canvas.getContext("2d");
        if (!res) return;
        ctx = res;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasDisplayedWidth, canvasDisplayedHeight);

        canvas.addEventListener("mousedown", (e) => mouseDown(e));
        canvas.addEventListener("mouseup", (e) => mouseUp(e));

        window.addEventListener("resize", function () {
            updateCanvasBoundingRect(canvas);
        });
        updateCanvasBoundingRect(canvas);

        createCells();

        canvasRedraws.subscribe(() => {
            fullRedraw();
        });

        objectListWritable.subscribe((objList) => {
            if (objList == objectList) return;
            objectList = objList;
            selectedObject.set(undefined);
            fullRedraw();
        });
    });

    afterUpdate(() => {
        if (!ctx) return; //Don't run on mount
        if ($objectListWritable.length > 0) return; //Don't run if there are objects

        console.log("switched displays");
        const res = canvas.getContext("2d");
        if (!res) return;
        ctx = res;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasDisplayedWidth, canvasDisplayedHeight);

        updateCanvasBoundingRect(canvas);
        cellList = [];
        createCells();
    });
</script>

<canvas
    bind:this={canvas}
    width={`${canvasDisplayedWidth}`}
    height={`${canvasDisplayedHeight}`}
/>
