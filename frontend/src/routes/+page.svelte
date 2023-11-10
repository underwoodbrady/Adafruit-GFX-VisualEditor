<script lang="ts">
    import Color from "$lib/components/Color.svelte";
    import IconButton from "$lib/components/IconButton.svelte";
    import TextButton from "$lib/components/TextButton.svelte";
    import Tool from "$lib/components/Tool.svelte";

    import Highlight, { LineNumbers } from "svelte-highlight";
    import arduino from "svelte-highlight/languages/arduino";
    import arduinoLight from "svelte-highlight/styles/docco";

    let canvasTrueWidth: number = 320;
    let canvasTrueHeight: number = 170;

    //TODO: Add some logic on how much to scale based on true width

    let canvasDisplayedWidth: number = canvasTrueWidth * 2;
    let canvasDisplayedHeight: number = canvasTrueHeight * 2;

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

    let code: string = `void drawRoundRect(uint16_t x0, uint16_t y0, uint16_t w, uint16_t h, uint16_t radius, uint16_t color);
void fillRoundRect(uint16_t x0, uint16_t y0, uint16_t w, uint16_t h, uint16_t radius, uint16_t color);`;
</script>

<svelte:head>
    {@html arduinoLight}
</svelte:head>

<header
    class="flex justify-between items-center px-8 py-4 border-b border-neutral-400 bg-neutral-300 drop-shadow-sm fixed top-0 left-0 w-full z-50"
>
    <div class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Adafruit GFX Logo" class="h-4" />
        <h1><span class="font-bold">Adafruit GFX</span> - Visual Editor</h1>
    </div>
    <nav>
        <ul class="flex items-center space-x-6">
            <li class="flex items-center space-x-2">
                <img
                    src="/display.svg"
                    alt="Down Arrow"
                    class="h-[15px] mt-[2px]"
                />
                <p class="font-semibold text-sm">
                    OLED {canvasTrueWidth}x{canvasTrueHeight}
                </p>
                <img
                    src="/down-arrow.svg"
                    alt="Down Arrow"
                    class="w-2 mt-[2px]"
                />
            </li>
            <li class="flex items-center space-x-2">
                <img
                    src="/microcontroller.svg"
                    alt="Down Arrow"
                    class="w-4 mt-[2px]"
                />
                <p class="text-neutral-500 text-sm">Select Microcontroller</p>
                <img
                    src="/down-arrow-grey.svg"
                    alt="Down Arrow"
                    class="w-2 mt-[2px]"
                />
            </li>
        </ul>
    </nav>
    <button
        on:click={() => {}}
        class="flex items-center space-x-2 p-2 -m-2 cursor-pointer hover:bg-neutral-200 duration-75"
    >
        <img src="/github.svg" alt="Github Logo" class="h-4" />
        <p class="text-sm">Beta V0.2</p>
    </button>
</header>
<main
    class="flex flex-col space-y-4 justify-center mt-[57px] pt-6 mx-auto"
    style={`width:${canvasDisplayedWidth}px`}
>
    <section class="flex items-center space-x-4 place-self-end">
        <!--Settings-->

        <IconButton icon="/undo.svg" onClick={() => {}} />
        <TextButton icon="/delete.svg" text="Clear" onClick={() => {}} />
        <IconButton icon="/gear.svg" onClick={() => {}} filled />
        <TextButton
            icon="/code.svg"
            text="Generate"
            onClick={() => {}}
            filled
        />
    </section>
    <section class="relative">
        <div class="absolute -left-[104px] top-0 grid grid-cols-2 gap-4">
            <!--Color Panel-->
            <Color onClick={() => {}} color="#ff0000" selected />
            <Color onClick={() => {}} color="#0000ff" />
            <Color onClick={() => {}} color="#00ff00" />
            <Color onClick={() => {}} color="#00ffff" />
            <Color onClick={() => {}} color="#ff00ff" />
            <Color onClick={() => {}} color="#ffff00" />
            <Color onClick={() => {}} color="#000000" />
            <Color onClick={() => {}} color="#ffffff" />
            <Color onClick={() => {}} openSlot />
            <Color onClick={() => {}} openSlot />
            <Color onClick={() => {}} openSlot />
            <Color onClick={() => {}} openSlot />
        </div>
        <div
            class="relative bg-white border-2 border-neutral-900"
            style={`width:${canvasDisplayedWidth}px;height:${canvasDisplayedHeight}px`}
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
            <canvas />
        </div>
        <div
            class="absolute -right-40 top-0 w-36 h-full bg-neutral-400 border-2 border-black p-4"
        >
            <!--Properties-->
            <div class="flex space-x-2 items-center">
                <img src="/properties.svg" alt="Properties Icon" class="w-4" />
                <p class="text-sm font-semibold mb-[2px]">Properties</p>
            </div>
            <p class="text-center text-neutral-700 mt-6 text-xs">
                Select Object
            </p>
        </div>
    </section>
    <section class="flex flex-wrap gap-4 place-self-start">
        <!--Tools-->
        <Tool icon="/rect-open.svg" onClick={() => {}} selected />
        <Tool icon="/rect-closed.svg" onClick={() => {}} />
        <Tool icon="/round-rect-open.svg" onClick={() => {}} />
        <Tool icon="/round-rect-closed.svg" onClick={() => {}} />
        <Tool icon="/circle-open.svg" onClick={() => {}} />
        <Tool icon="/circle-closed.svg" onClick={() => {}} />
        <Tool icon="/tri-open.svg" onClick={() => {}} />
        <Tool icon="/tri-closed.svg" onClick={() => {}} />
        <Tool icon="/paint-brush.svg" onClick={() => {}} additionalInfo />
        <Tool icon="/paint-bucket.svg" onClick={() => {}} additionalInfo />
        <Tool icon="/text.svg" onClick={() => {}} additionalInfo />
    </section>
    {#if showCode}
        <section class="pt-6 flex-col space-y-4">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <p class="font-semibold">{currentStage}</p>
                    {#if currentStage == "Done"}
                        <img
                            src="/check.svg"
                            alt="Check Mark"
                            class="h-6"
                        />
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
