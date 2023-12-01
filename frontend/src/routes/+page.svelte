<script lang="ts">
    import IconButton from "$lib/components/IconButton.svelte";
    import TextButton from "$lib/components/TextButton.svelte";
    import Canvas from "$lib/containers/Canvas.svelte";
    import ColorSelector from "$lib/containers/ColorSelector.svelte";
    import Header from "$lib/containers/Header.svelte";
    import PropertiesPanel from "$lib/containers/PropertiesPanel.svelte";
    import ToolSelector from "$lib/containers/ToolSelector.svelte";
    import {
        objectListWritable,
        selectedObject,
    } from "$lib/containers/objectList";
    import { onMount } from "svelte";

    import Highlight, { LineNumbers } from "svelte-highlight";
    import arduino from "svelte-highlight/languages/arduino";
    import arduinoLight from "svelte-highlight/styles/docco";
    import { createFullCode } from "../createCode";
    import displayToLib from "../displayToLib.json";
    import Tooltip from "$lib/components/Tooltip.svelte";

    let canvasTrueWidth: number;
    let canvasTrueHeight: number;

    let canvasScale: number = 1;
    const canvasMaxScale: number = 6; // Sets max virtual display scaling the program can do

    let canvasDisplayedWidth: number;
    let canvasDisplayedHeight: number;

    let thisWindow : Window;

    const updateVariables = (canvasTrueWidth:number, canvasTrueHeight:number) =>{
        if(!thisWindow) return
        let screenWidth = thisWindow.innerWidth;
        let xBuffer = 344;
        let possibleSizes = Array.from({ length: canvasMaxScale },(value, index) => 1 + index * 1).filter((num)=>{
            return num*canvasTrueWidth<screenWidth-xBuffer
        })
        canvasScale = possibleSizes.pop() || 1; //Get largest possible size or default to 1
        canvasDisplayedHeight = canvasTrueHeight * canvasScale;
        canvasDisplayedWidth = canvasTrueWidth * canvasScale;
    }

    $: updateVariables(canvasTrueWidth, canvasTrueHeight);

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
    let currentStage: generatingStages = allHappyPathStages[0];
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
        {
            name: "image",
            image: "/image.svg",
            disabled: true,
        },
        {
            name: "heart-closed",
            image: "/heart.svg",
            special: true,
        },
        {
            name: "star-open",
            image: "/star-open.svg",
            special: true,
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

    let selectedDisplay: keyof typeof displayToLib;
    let selectedTool: { name: string; image: string };
    let selectedColor: HEX;

    //Unify arrow functions vs traditional
    let setChoosenDisplay = (display: keyof typeof displayToLib) => {
        selectedDisplay = display;
        objectListWritable.set([]);
        canvasTrueWidth = Number(displayToLib[display].res.split("x")[0]);
        canvasTrueHeight = Number(displayToLib[display].res.split("x")[1]);
        // canvasDisplayedWidth = canvasTrueWidth * canvasScale;
        // canvasDisplayedHeight = canvasTrueHeight * canvasScale;
    };

    let generateCode = () => {
        createFullCode(
            "" as keyof typeof displayToLib,
            [""],
            [""],
            $objectListWritable,
        ).then((c) => {
            code = c;
        });
    };

    onMount(() => {
        selectedTool = tools[0];
        selectedColor = colors[0];
        thisWindow = window;
    });

    let displayDropdownOpen: boolean = false;
</script>

<svelte:head>
    {@html arduinoLight}
</svelte:head>

<Header
    displays={displayToLib}
    choosenDisplay={selectedDisplay}
    {setChoosenDisplay}
    dropdownOpen={displayDropdownOpen}
/>
<main
    class={"flex flex-col space-y-4 justify-center mt-[57px] py-6 mx-auto" +
        (canvasDisplayedWidth ? "" : " w-[500px]")}
    style={canvasDisplayedWidth ? `width:${canvasDisplayedWidth + 4}px` : ""}
>
    <section class="flex items-center space-x-4 place-self-end">
        <!--Settings-->

        <IconButton icon="/undo.svg" onClick={() => {}} />
        <TextButton
            icon="/delete.svg"
            text="Clear"
            onClick={() => {
                objectListWritable.set([]);
            }}
        />
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
            <ColorSelector
                {colors}
                {selectedColor}
                updateSelectedColor={(color) => {
                    selectedColor = color;
                }}
                updateColor={(color, index) => {
                    colors[index] = color;
                    selectedColor = color;
                }}
            />
        </div>
        {#if canvasTrueHeight && canvasTrueWidth}
            <div
                class="relative bg-neutral-100 border-2 border-neutral-900"
                style={`width:${canvasDisplayedWidth + 4}px;height:${
                    canvasDisplayedHeight + 4
                }px`}
            >
                <!--Canvas-->
                <p
                    class="absolute -top-5 left-0 text-xs font-bold text-neutral-900"
                >
                    {canvasTrueWidth}x{canvasTrueHeight}
                    <span class="font-semibold"
                        >({canvasDisplayedWidth}x{canvasDisplayedHeight})</span
                    >
                </p>
                <Canvas
                    {selectedColor}
                    {selectedTool}
                    {canvasDisplayedWidth}
                    {canvasDisplayedHeight}
                    {canvasScale}
                />
            </div>
        {:else}
            <div
                class="relative bg-neutral-100 border-2 border-neutral-900 w-[500px] h-80 flex items-center justify-center flex-col font-semibold space-y-2 text-sm"
            >
                <!--Canvas-->
                <div class="flex items-center space-x-1">
                    <img
                        src="/display-blue.svg"
                        alt="Display"
                        class="h-4 mt-[2px]"
                    />
                    <p>
                        <button
                            class="text-blue-500 underline"
                            on:click={() => {
                                displayDropdownOpen = true;
                            }}>Select</button
                        > display from above
                    </p>
                </div>
                <p class="text-neutral-500 text-xs">Or</p>
                <div
                    class="relative flex items-center space-x-1 select-none group"
                >
                    <img
                        src="/upload.svg"
                        alt="Display"
                        class="h-4 mt-[2px] opacity-40"
                    />
                    <p class="text-black/40">
                        <a class="text-blue-500/40 underline" href="">Upload</a>
                        previous code
                    </p>
                    <div
                        class="absolute -bottom-4 left-1/2 -translate-x-1/2 group-hover:inline hidden"
                    >
                        <Tooltip text="Coming Soon" />
                    </div>
                </div>
            </div>
        {/if}
        <div
            class="absolute -right-44 top-0 w-40 min-h-full bg-neutral-300 border-2 border-black p-4 flex rounded-sm"
        >
            <!--Properties-->
            <PropertiesPanel
                {canvasTrueWidth}
                {canvasTrueHeight}
                selectedObject={$selectedObject}
            />
        </div>
    </section>
    <section class="flex flex-wrap gap-4 place-self-start">
        <!--Tools-->
        <ToolSelector
            {tools}
            {selectedTool}
            updateSelectedTool={(tool) => {
                selectedTool = tool;
            }}
        />
    </section>
    {#if showCode}
        <section class="py-6 flex-col space-y-4">
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
            <div class="w-full border-neutral-900 border-2 text-sm rounded-sm">
                <Highlight language={arduino} let:highlighted {code}>
                    <LineNumbers {highlighted} wrapLines />
                </Highlight>
            </div>
        </section>
    {/if}
</main>
<footer />
