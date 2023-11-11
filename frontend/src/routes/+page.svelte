<script lang="ts">
    import IconButton from "$lib/components/IconButton.svelte";
    import TextButton from "$lib/components/TextButton.svelte";
    import Canvas from "$lib/containers/Canvas.svelte";
    import ColorSelector from "$lib/containers/ColorSelector.svelte";
    import Header from "$lib/containers/Header.svelte";
    import PropertiesPanel from "$lib/containers/PropertiesPanel.svelte";
    import ToolSelector from "$lib/containers/ToolSelector.svelte";
    import { objectListWritable } from "$lib/containers/objectList";
    import { onMount } from "svelte";

    import Highlight, { LineNumbers } from "svelte-highlight";
    import arduino from "svelte-highlight/languages/arduino";
    import arduinoLight from "svelte-highlight/styles/docco";
    import { createFullCode } from "../createCode";

    let canvasTrueWidth: number = 320;
    let canvasTrueHeight: number = 170;

    //TODO: Add some logic on how much to scale based on true width
    let canvasScale: number = 2;

    let canvasDisplayedWidth: number = canvasTrueWidth * canvasScale;
    let canvasDisplayedHeight: number = canvasTrueHeight * canvasScale;

    let showCode: boolean = true;
    type generatingStages =
        | "Generating"
        | "Optimizing"
        | "Compiling"
        | "Done"
        | "Error";
    let allHappyPathStages: generatingStages[] = [
        "Generating",
        "Optimizing",
        "Compiling",
        "Done",
    ];
    let currentStage: generatingStages = allHappyPathStages[3];
    let code: string = ``;

    let tools = [
        {
            name: "rect-open",
            image: "/rect-open.svg",
        },
        {
            name: "rect-closed",
            image: "/rect-closed.svg",
        },
        {
            name: "round-rect-open",
            image: "/round-rect-open.svg",
        },
        {
            name: "round-rect-closed",
            image: "/round-rect-closed.svg",
        },
        {
            name: "circle-open",
            image: "/circle-open.svg",
        },
        {
            name: "circle-closed",
            image: "/circle-closed.svg",
        },
        {
            name: "tri-open",
            image: "/tri-open.svg",
        },
        {
            name: "tri-closed",
            image: "/tri-closed.svg",
        },
        {
            name: "line",
            image: "/line.svg",
        },
        {
            name: "cursor",
            image: "/cursor.svg",
        },
        {
            name: "paint-brush",
            image: "paint-brush.svg",
        },
        {
            name: "paint-bucket",
            image: "/paint-bucket.svg",
        },
        {
            name: "text",
            image: "/text.svg",
        },
    ];

    type HEX = `#${string}`;

    let colors: HEX[] = [
        "#ff0000",
        "#0000ff",
        "#00ff00",
        "#00ffff",
        "#ff00ff",
        "#ffff00",
        "#000000",
        "#ffffff",
        "#",
        "#",
        "#",
        "#",
    ];

    let selectedTool: {name:string, image:string};
    let selectedColor: HEX;
    let selectedObject;

    let generateCode = () => {
        createFullCode("", [""], [""], $objectListWritable).then((c)=>{
            code = c;
        })}

    onMount(() => {
        selectedTool = tools[0];
        selectedColor = colors[0];
    });
</script>

<svelte:head>
    {@html arduinoLight}
</svelte:head>

<Header choosenDisplay={`OLED ${canvasTrueWidth}x${canvasTrueHeight}`} />
<main
    class="flex flex-col space-y-4 justify-center mt-[57px] pt-6 mx-auto"
    style={`width:${canvasDisplayedWidth+4}px`}
>
    <section class="flex items-center space-x-4 place-self-end">
        <!--Settings-->

        <IconButton icon="/undo.svg" onClick={() => {}} />
        <TextButton icon="/delete.svg" text="Clear" onClick={() => {}} />
        <IconButton icon="/gear.svg" onClick={() => {}} filled />
        <TextButton
            icon="/code.svg"
            text="Generate"
            onClick={generateCode}
            filled
        />
    </section>
    <section class="relative">
        <div class="absolute -left-[104px] top-0 grid grid-cols-2 gap-4">
            <!--Color Panel-->
            <ColorSelector {colors} {selectedColor} updateSelectedColor={(color)=>{selectedColor=color}} />
        </div>
        <div
            class="relative bg-white border-2 border-neutral-900"
            style={`width:${canvasDisplayedWidth+4}px;height:${canvasDisplayedHeight+4}px`}
        >
            <!--Canvas-->
            <p
                class="absolute -top-6 left-0 text-sm font-bold text-neutral-900"
            >
                {canvasTrueWidth}x{canvasTrueHeight}
                <span class="font-semibold"
                    >({canvasDisplayedWidth}x{canvasDisplayedHeight})</span
                >
            </p>
            <Canvas {selectedColor} {selectedTool} {canvasDisplayedWidth} {canvasDisplayedHeight} {canvasScale}/>
        </div>
        <div
            class="absolute -right-40 top-0 w-36 h-full bg-neutral-400 border-2 border-black p-4"
        >
            <!--Properties-->
            <PropertiesPanel />
        </div>
    </section>
    <section class="flex flex-wrap gap-4 place-self-start">
        <!--Tools-->
        <ToolSelector {tools} {selectedTool} updateSelectedTool={(tool)=>{selectedTool=tool}} />
    </section>
    {#if showCode}
        <section class="pt-6 flex-col space-y-4 pb-6">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <p class="font-semibold">{currentStage}</p>
                    {#if currentStage == "Done"}
                        <img src="/check.svg" alt="Check Mark" class="h-6" />
                    {:else if currentStage == "Error"}
                        <img
                            src="/spinner.svg"
                            alt="Spinner"
                            class="animate-spin h-4"
                        />
                    {:else}
                        <img
                            src="/spinner.svg"
                            alt="Spinner"
                            class="animate-spin h-4"
                        />
                    {/if}
                </div>
                <div class="flex items-center space-x-4">
                    <IconButton onClick={() => {}} icon="/copy.svg" />
                    <IconButton
                        onClick={() => {}}
                        icon="/download.svg"
                        filled
                    />
                </div>
            </div>
            <div class="w-full border-neutral-900 border-2 text-sm">
                <Highlight language={arduino} let:highlighted {code}>
                    <LineNumbers {highlighted} wrapLines />
                </Highlight>
            </div>
        </section>
    {/if}
</main>
<footer />
