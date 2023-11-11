<script lang="ts">
    import { onMount } from "svelte";
    import CanvasOb from "../../CanvasOb";
    import Cell from "../../Cell";

    type HEX = `#${string}`;

    export let selectedColor: HEX;
    export let selectedTool: { name: string; image: string };
    export let canvasDisplayedWidth: number;
    export let canvasDisplayedHeight: number;
    export let canvasScale: number;
    

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let canvasBoundingRect: DOMRect;

    let cellList: Cell[][] = [];
    let objectList: CanvasOb[] = [];
    let objectStates: (typeof objectList)[] = []; //For undo feature

    let getMousePositions = (
        e: MouseEvent
    ): { mouseX: number; mouseY: number } => {
        return {
            mouseX: e.clientX - canvasBoundingRect.left,
            mouseY: e.clientY - canvasBoundingRect.top + window.scrollY,
        };
    };

    let updateCanvasBoundingRect = () => {
        canvasBoundingRect = canvas.getBoundingClientRect();
    };

    let startingMouseX: number;
    let startingMouseY: number;

    let mouseDown = (e: MouseEvent) => {
        const { mouseX, mouseY } = getMousePositions(e);
        startingMouseX = mouseX;
        startingMouseY = mouseY;
        canvas.onmousemove = (e) => mouseMove(e);
    };

    let mouseUp = (e: MouseEvent) => {
        const { mouseX, mouseY } = getMousePositions(e);
        canvas.onmousemove = null;
        let newObject: CanvasOb | undefined = undefined;

        let cellX = Math.round(startingMouseX / canvasScale);
        let cellY = Math.round(startingMouseY / canvasScale);

        let cellWidth = Math.round((mouseX - startingMouseX) / canvasScale);
        let cellHeight = Math.round((mouseY - startingMouseY) / canvasScale);

        switch (selectedTool.name) {
            case "rect-open":
                newObject = new CanvasOb(
                    "rect",
                    "outline",
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    selectedColor
                );
                break;
            case "rect-closed":
                newObject = new CanvasOb(
                    "rect",
                    "fill",
                    cellX,
                    cellY,
                    cellWidth,
                    cellHeight,
                    selectedColor
                );
                break;
            case "round-rect-open":
                break;
            case "round-rect-closed":
                break;
            case "circle-open":
                break;
            case "circle-closed":
                break;
            case "tri-open":
                break;
            case "tri-closed":
                break;
            case "line":
                break;
            case "cursor":
                break;
            default:
        }
        if (newObject != undefined) objectList.push(newObject);
        console.log(newObject);
        mapObjectsToCells();
        drawCells();
        console.log(cellList);
    };

    let mouseMove = (e: MouseEvent) => {
        let { mouseX, mouseY } = getMousePositions(e);

        if (selectedTool.name == "paint-brush") {
            cellList[Math.round(mouseY / canvasScale)][
                Math.round(mouseX / canvasScale)
            ].color = selectedColor;
            drawCells();
        }
    };

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

    //Handle objects first, only call this if needed
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
                //ctx.fillStyle = `rgb(${cellRowNum/cellListLength*255},${cellNum/cellRowLength*255},${125})` Pretty Gradient
                ctx.fillRect(cell.x, cell.y, cell.size, cell.size);
            }
        }
    };

    let mapObjectsToCells = () => {
        for (
            let objectNum: number = 0,
                objectListLength: number = objectList.length;
            objectNum < objectListLength;
            objectNum++
        ) {
            let object = objectList[objectNum];
            switch (object.shape) {
                case "circle":
                    break;
                case "rect":
                    for (
                        let cellRowNum: number = object.y,
                            cellRowMax = object.y + object.h;
                        cellRowNum < cellRowMax + 1;
                        cellRowNum++
                    ) {
                        let cellRow = cellList[cellRowNum];
                        for (
                            let cellNum: number = object.x,
                                cellNumMax: number = object.x + object.w;
                            cellNum < cellNumMax + 1;
                            cellNum++
                        ) {
                            let cell = cellRow[cellNum];
                            if (object.type == "fill") {
                                cell.color = object.color;
                                cell.object = object;
                                continue;
                            } else if (
                                object.type == "outline" &&
                                (cellNum == object.x ||
                                    cellRowNum == object.y ||
                                    cellNum == cellNumMax ||
                                    cellRowNum == cellRowMax)
                            ) {
                                cell.color = object.color;
                                cell.object = object;
                            }
                        }
                    }
                    break;
                case "triangle":
                    break;
                case "round-rect":
                    break;
                case "line":
                    break;
                case "dot":
                    break;
            }
        }
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
            updateCanvasBoundingRect();
        });

        updateCanvasBoundingRect();

        createCells();
    });
</script>

<canvas
    bind:this={canvas}
    width={`${canvasDisplayedWidth}`}
    height={`${canvasDisplayedHeight}`}
/>
