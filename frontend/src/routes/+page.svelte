<script lang="ts">
    /*Component Imports*/
    import IconButton from "$lib/components/IconButton.svelte";
    import TextButton from "$lib/components/TextButton.svelte";
    import Canvas from "$lib/containers/Canvas.svelte";
    import ColorSelector from "$lib/containers/ColorSelector.svelte";
    import Header from "$lib/containers/Header.svelte";
    import PropertiesPanel from "$lib/containers/PropertiesPanel.svelte";
    import ToolSelector from "$lib/containers/ToolSelector.svelte";
    import Tooltip from "$lib/components/Tooltip.svelte";
    import TooltipTop from "$lib/components/TooltipTop.svelte";
    import ConfirmationModal from "$lib/components/ConfirmationModal.svelte";

    /*Svelte Imports*/
    import {
        objectListWritable,
        selectedObject,
    } from "$lib/containers/objectList";
    import { onMount } from "svelte";

    /*Code Library Imports*/
    import Highlight, { LineNumbers } from "svelte-highlight";
    import arduino from "svelte-highlight/languages/arduino";
    import arduinoLight from "svelte-highlight/styles/docco";

    /*Utility Imports*/
    import { createFullCode } from "../createCode";
    import displayToLib from "../utils/displayToLib.json";
    import SettingsModal from "$lib/components/SettingsModal.svelte";

    let canvasTrueWidth: number;
    let canvasTrueHeight: number;

    let canvasScale: number = 1;
    const canvasMaxScale: number = 6; // Sets max virtual display scaling the program can do

    let canvasDisplayedWidth: number;
    let canvasDisplayedHeight: number;

    let thisWindow: Window;

    const updateSizeVariables = (
        canvasTrueWidth: number,
        canvasTrueHeight: number,
    ) => {
        if (!thisWindow) return;
        let screenWidth = thisWindow.innerWidth;
        let xBuffer = 344;
        let possibleSizes = Array.from(
            { length: canvasMaxScale },
            (value, index) => 1 + index,
        ).filter((num) => {
            return num * canvasTrueWidth < screenWidth - xBuffer;
        });
        canvasScale = possibleSizes.pop() || 1; //Get largest possible size or default to 1
        canvasDisplayedHeight = canvasTrueHeight * canvasScale;
        canvasDisplayedWidth = canvasTrueWidth * canvasScale;
    };

    $: updateSizeVariables(canvasTrueWidth, canvasTrueHeight);

    let showCode: boolean = false;

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

    let currentStage: number = 0;

    let currentCodeAnimStage: generatingStages =
        allHappyPathStages[currentStage];
    $: currentCodeAnimStage = allHappyPathStages[currentStage];

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
        // {
        //     name: "polygon-open",
        //     image: "/star-open.svg",
        //     special: true,
        // },
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

    let monochromeColors: HEX[] = ["#000000", "#ffffff"];

    let selectedDisplay: keyof typeof displayToLib | undefined;
    let customDisplay: {
        width: number;
        height: number;
        library: string;
    };
    let selectedLibrary: string;
    let selectedTool: { name: string; image: string };
    let selectedColor: HEX;

    let displayDropdownOpen: boolean = false;
    let tempSelectedDisplay: keyof typeof displayToLib;
    let displayConfirmationModal: boolean = false;
    let codeSection: HTMLElement;

    let displaySettingsModal: boolean = false;

    let hideConfirmationModal = () => {
        displayConfirmationModal = false;
    };

    let hideSettingsModal = () => {
        displaySettingsModal = false;
    }

    //TODO: Unify arrow functions vs traditional
    let setChoosenDisplay = (display: keyof typeof displayToLib) => {
        if ($objectListWritable.length == 0) {
            confirmChoosenDisplay(display);
            return;
        }
        tempSelectedDisplay = display;
        displayConfirmationModal = true;
    };

    let setCustomDisplay = (display: typeof customDisplay) => {
        selectedDisplay = undefined;
        customDisplay = display;
        selectedLibrary = `Adafruit_${display.library}.h`; //TODO: Do better
        objectListWritable.set([]);
        canvasTrueWidth = display.width;
        canvasTrueHeight = display.height;
        selectedColor = "#ffffff";
        hideConfirmationModal();
    };

    let confirmChoosenDisplay = (display: keyof typeof displayToLib) => {
        selectedDisplay = display;
        selectedLibrary = displayToLib[selectedDisplay].lib;
        objectListWritable.set([]);
        canvasTrueWidth = Number(displayToLib[display].res.split("x")[0]);
        canvasTrueHeight = Number(displayToLib[display].res.split("x")[1]);
        selectedColor = "#ffffff";
        hideConfirmationModal();
    };

    let codeFile: any = null;

    let showCopied: boolean = false;

    let onPressCopy = () => {
        if (showCopied) return;
        navigator.clipboard.writeText(code);
        showCopied = true;
        let timeOut = setTimeout(() => {
            showCopied = false;
            clearTimeout(timeOut);
        }, 2000);
    };

    let generateCode = () => {
        currentStage = 0;
        createFullCode(selectedLibrary, [""], $objectListWritable).then((c) => {
            code = c;
            const data = new Blob([code], { type: "text/plain" }); //Creates text file with each word on its own line

            if (codeFile !== null)
                //Prevents memory leaks
                window.URL.revokeObjectURL(codeFile);

            codeFile = window.URL.createObjectURL(data);
        });

        showCode = true;
        /*TODO: Improve animation to be more realistic - also a lot of this code is dogshit*/
        let codegenAnim = setInterval(() => {
            if (currentStage == 1)
                codeSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            if (currentStage >= allHappyPathStages.length - 1) {
                clearInterval(codegenAnim);
                return;
            }
            currentStage += 1;
        }, 300);
    };

    onMount(() => {
        selectedTool = tools[0];
        selectedColor = colors[0];
        thisWindow = window;
    });
</script>

<svelte:head>
    {@html arduinoLight}
</svelte:head>

<Header
    displays={displayToLib}
    choosenDisplay={selectedDisplay ||
        (customDisplay?.width
            ? `Custom ${customDisplay?.width}x${customDisplay?.height}`
            : undefined)}
    {setChoosenDisplay}
    {setCustomDisplay}
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
                showCode = false;
                code = "";
            }}
        />
        <IconButton icon="/gear.svg" onClick={() => {
            displaySettingsModal = true;
        }} filled />
        <TextButton
            icon="/code.svg"
            text="Generate"
            onClick={generateCode}
            filled
            loading={currentStage > 0 && currentStage < 3}
        />
    </section>
    <section class="relative">
        <div class="absolute -left-[104px] top-0 grid grid-cols-2 gap-4">
            <!--Color Panel-->
            <ColorSelector
                colors={selectedDisplay
                    ? displayToLib[selectedDisplay].color
                        ? colors
                        : monochromeColors
                    : colors}
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
                        <a class="text-blue-500/40 underline" href="/">Upload</a
                        >
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
            class="absolute -right-48 top-0 w-44 min-h-full bg-neutral-300 border-2 border-black p-4 flex rounded-sm"
        >
            <!--Properties-->
            <PropertiesPanel
                {canvasTrueWidth}
                {canvasTrueHeight}
                selectedObject={selectedObject}
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

    <section
        class={showCode ? "py-6 flex-col space-y-4" : "hidden"}
        bind:this={codeSection}
    >
        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <p class="font-semibold">{currentCodeAnimStage}</p>
                {#if currentCodeAnimStage == "Done"}
                    <img src="/check.svg" alt="Check Mark" class="h-6" />
                {:else if currentCodeAnimStage == "Error"}
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
                <div class="relative">
                    <IconButton onClick={onPressCopy} icon="/copy.svg" />
                    <div
                        class={showCopied
                            ? "absolute -top-4 left-1/2 -translate-x-1/2"
                            : "hidden"}
                    >
                        <TooltipTop text="Copied!" />
                    </div>
                </div>
                <a
                    href={codeFile}
                    download="GFXSketch.ino"
                    class="w-9 h-9 flex items-center justify-center drop-shadow-sm border-neutral-900 duration-75 border-2 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-600"
                >
                    <img src="/download.svg" alt="Button Icon" class="h-4" />
                </a>
            </div>
        </div>
        <div class="w-full border-neutral-900 border-2 text-sm rounded-sm">
            <Highlight language={arduino} let:highlighted {code}>
                <LineNumbers {highlighted} wrapLines />
            </Highlight>
        </div>
    </section>
</main>
{#if displayConfirmationModal}
    <ConfirmationModal
        title="Are you sure you want to continue?"
        text="Switching displays will clear the canvas"
        onPressCancel={hideConfirmationModal}
        onPressAction={() => confirmChoosenDisplay(tempSelectedDisplay)}
    />
{/if}
{#if displaySettingsModal}
    <SettingsModal
        onPressCancel={hideSettingsModal}
        onPressAction={hideSettingsModal}
    />
{/if}
<footer />
