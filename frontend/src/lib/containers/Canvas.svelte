<script lang="ts">
    import { onMount } from "svelte";

    export let selectedColor;
    export let selectedTool;
    export let canvasDisplayedWidth: number;
    export let canvasDisplayedHeight: number;

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let canvasBoundingRect: DOMRect;

    let updateCanvasBoundingRect = ()=>{
        canvasBoundingRect = canvas.getBoundingClientRect();
    }

    let mouseDown = (e: MouseEvent) => {
        canvas.onmousemove = (e) => mouseMove(e);
    };

    let mouseUp = (e: MouseEvent) => {
        canvas.onmousemove = null;
    };

    let mouseMove = (e: MouseEvent) => {
        ctx.fillStyle = "white";
        ctx.fillRect(
            e.clientX - canvasBoundingRect.left,
            e.clientY - canvasBoundingRect.top,
            2,
            2
        );
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
            updateCanvasBoundingRect()
        });
        updateCanvasBoundingRect()
    });
</script>

<canvas
    bind:this={canvas}
    width={`${canvasDisplayedWidth}`}
    height={`${canvasDisplayedHeight}`}
/>
