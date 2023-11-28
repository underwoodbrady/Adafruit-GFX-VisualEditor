<script lang="ts">
    import Screen from "$lib/components/Screen.svelte";

    export let choosenDisplay: string;
    export let dropdownOpen: boolean = false;

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
        <div class="absolute top-[calc(100%+10px)] -left-2 w-[calc(100%+16px)]  bg-neutral-300 p-2 border-b border-r border-l border-neutral-400 drop-shadow-sm">
            <search class="mb-2">
                <input type="search" class="max-w-full h-6 bg-neutral-200 text-xs px-2 font-semibold" placeholder="Search ..." />
            </search>
            <ul class="flex flex-col max-h-60 overflow-y-scroll">
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
                <Screen/>
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
