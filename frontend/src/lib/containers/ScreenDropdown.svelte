<script lang="ts">
    import Screen from "$lib/components/Screen.svelte";
    import displayToLib from "../../displayToLib.json";

    export let choosenDisplay: string;
    export let displays: typeof displayToLib;
    export let dropdownOpen: boolean = false;
    export let setChoosenDisplay: (display: keyof typeof displayToLib) => void;

    let displayMap: [keyof typeof displayToLib] = Object.keys(displays) as [
        keyof typeof displayToLib,
    ]; //TODO: FIX this is wack

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }
</script>

<div class="relative">
    <button
        on:click={toggleDropdown}
        class="flex items-center space-x-2 cursor-pointer hover:bg-neutral-200 duration-75 p-2 -m-2"
    >
        <img src="/display.svg" alt="Display" class="h-[15px] mt-[2px]" />
        <p class="font-semibold text-sm">{choosenDisplay}</p>
        <img src="/down-arrow.svg" alt="Down Arrow" class="w-2 mt-[2px]" />
    </button>
    <!--Dropdown-->
    {#if dropdownOpen}
        <div
            class="absolute top-[calc(100%+10px)] -left-2 w-64 bg-neutral-300 p-2 border-b border-r border-l border-neutral-400 drop-shadow-sm"
        >
            <div class="flex space-x-2 items-center mb-2">
                <search
                    class="relative max-w-full h-8 w-40 bg-neutral-200 flex items-center"
                >
                    <input
                        type="search"
                        class="absolute left-0 top-0 right-0 bottom-0 bg-neutral-200 text-neutral-800 text-sm pl-8 pr-2 placeholder:text-neutral-400 border-none outline-none"
                        placeholder="Search"
                    />
                    <img
                        src="/search.svg"
                        alt="Search Icon"
                        class="h-3 z-20 pl-3"
                    />
                </search>
                <button
                    on:click={() => {}}
                    class="text-xs font-semibold text-blue-500 underline flex items-center p-1"
                    ><img
                        src="/gears.svg"
                        alt="gears icon"
                        class="h-3 mr-1"
                    />Custom</button
                >
            </div>
            <ul class="flex flex-col max-h-60 overflow-y-scroll">
                {#each displayMap as display}
                    <Screen
                        name={display}
                        details={displayToLib[display].details}
                        library={displayToLib[display].lib}
                        onClick={() => setChoosenDisplay(display)}
                    />
                {/each}
            </ul>
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
</style>
