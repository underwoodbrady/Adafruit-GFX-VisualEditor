<script lang="ts">
    import Screen from "$lib/components/Screen.svelte";
    import TextButton from "$lib/components/TextButton.svelte";
    import displayToLib from "../../utils/displayToLib.json";

    export let choosenDisplay: string;
    export let displays: typeof displayToLib;
    export let dropdownOpen: boolean;
    export let setChoosenDisplay: (display: keyof typeof displayToLib) => void;
    export let setCustomDisplay: (display: {
        width:number,
        height:number,
        library:string
    }) => void = () => {};

    let displayMap: [keyof typeof displayToLib] = Object.keys(displays) as [
        keyof typeof displayToLib,
    ]; //TODO: FIX this is wack

    let filteredDisplayMap: [keyof typeof displayToLib] = displayMap;

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    let search: HTMLInputElement;

    function filterDisplayMap() {
        let tempMap = displayMap.filter(
            (element) =>
                element.toLowerCase().includes(search.value.toLowerCase()) ||
                displayToLib[element].details
                    .toLowerCase()
                    .includes(search.value.toLowerCase()),
        );
        if (tempMap.length == 0) return;
        filteredDisplayMap = tempMap; //TODO: Fix type error
    }

    let customDisplay: boolean = false;

    let customWidthInput: HTMLInputElement;
    let customHeightInput: HTMLInputElement;
    let customLibraryInput: HTMLInputElement;
</script>

<div class="relative">
    <button
        on:click={toggleDropdown}
        class="flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 rounded-sm duration-75 p-2 -m-2"
    >
        <img src="/display.svg" alt="Display" class="h-[15px] mt-[2px]" />
        <p class="font-semibold text-sm">{choosenDisplay}</p>
        <img src="/down-arrow.svg" alt="Down Arrow" class={ dropdownOpen ? "w-2 mt-[2px] duration-75 rotate-180" : "w-2 mt-[2px] duration-75"} />
    </button>
    <!--Dropdown-->
    {#if dropdownOpen}
        <div
            class="absolute top-[calc(100%+10px)] -left-2 w-64 bg-neutral-300 p-2 border-b border-r border-l border-neutral-400 drop-shadow-sm"
        >
            {#if customDisplay}
                <div class="p-1">
                    <form on:submit|preventDefault class="flex flex-col">
                        <div class="flex space-x-4 items-center mb-2">
                            <div class="flex flex-col">
                                <label
                                    for="width"
                                    class="text-xs text-neutral-700 mb-1 flex items-center"
                                    ><img
                                        src="/width.svg"
                                        alt="Width Icon"
                                        class="h-3 mr-1"
                                    />Width(px)</label
                                >
                                <input
                                    class="w-full bg-neutral-200 text-xs py-1 px-2 text-neutral-900"
                                    placeholder="120"
                                    type="number"
                                    bind:this={customWidthInput}
                                />
                            </div>
                            <div class="flex flex-col">
                                <label
                                    for="height"
                                    class="text-xs text-neutral-700 mb-1 flex items-center"
                                    ><img
                                        src="/height.svg"
                                        alt="Height Icon"
                                        class="h-3 mr-1"
                                    />Height(px)</label
                                >
                                <input
                                    class="w-full bg-neutral-200 text-xs py-1 px-2 text-neutral-900"
                                    placeholder="60"
                                    type="number"
                                    bind:this={customHeightInput}
                                />
                            </div>
                        </div>
                        <label
                            for="library"
                            class="text-xs text-neutral-700 mb-1 flex items-center"
                            ><img
                                src="/book.svg"
                                alt="Library Icon"
                                class="h-3 mr-1"
                            />Library</label
                        >
                        <input
                            class="bg-neutral-200 text-xs py-1 px-2 text-neutral-900"
                            placeholder="SSD1306"
                            bind:this={customLibraryInput}
                        />
                        <div
                            class="flex space-x-4 items-center justify-between mt-4"
                        >
                            <TextButton
                                text="Go Back"
                                icon="/undo.svg"
                                small
                                onClick={() => {
                                    customDisplay = false;
                                }}
                            />
                            <TextButton
                                text="Continue"
                                icon="/continue.svg"
                                filled
                                small
                                onClick={() => {
                                    if(!customHeightInput.value || !customLibraryInput.value || !customWidthInput.value) return
                                    setCustomDisplay({
                                        width:Number(customWidthInput.value),
                                        height:Number(customHeightInput.value),
                                        library:customLibraryInput.value
                                    });
                                }}
                            />
                        </div>
                    </form>
                </div>
            {:else}
                <div class="flex space-x-2 items-center mb-2">
                    <search
                        class="relative max-w-full h-7 w-40 bg-neutral-200 flex items-center"
                        on:input={filterDisplayMap}
                    >
                        <input
                            type="search"
                            class="absolute left-0 top-0 right-0 bottom-0 bg-neutral-200 text-neutral-800 text-sm pl-8 pr-2 placeholder:text-neutral-400 border-none outline-none"
                            placeholder="Search"
                            bind:this={search}
                        />
                        <img
                            src="/search.svg"
                            alt="Search Icon"
                            class="h-3 z-20 pl-3"
                        />
                    </search>
                    <button
                        on:click={() => {
                            customDisplay = true;
                        }}
                        class="text-xs font-semibold text-blue-500 underline flex items-center p-1"
                        ><img
                            src="/gears.svg"
                            alt="gears icon"
                            class="h-3 mr-1"
                        />Custom</button
                    >
                </div>

                <ul class="flex flex-col max-h-60 overflow-y-auto">
                    {#each filteredDisplayMap as display (displayToLib[display].details)}
                        <Screen
                            name={display}
                            details={displayToLib[display].details}
                            library={displayToLib[display].lib}
                            onClick={() => setChoosenDisplay(display)}
                        />
                    {/each}
                </ul>
            {/if}
        </div>
    {/if}
</div>

<style>
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background-color: rgb(215, 215, 215);
    }

    ::-webkit-scrollbar-thumb {
        background: rgb(167, 167, 167);
        border-radius: 2px;
    }

	/* .drop-down-anim {
		animation-name: drop-down;
		animation-duration: 0.2s;
		animation-direction: normal;
		animation-timing-function:ease;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	} */

	@keyframes drop-down {
		0% {
			transform: scaleY(0);
		}
		100% {
			transform: scaleY(100%);
		}
	}
</style>
