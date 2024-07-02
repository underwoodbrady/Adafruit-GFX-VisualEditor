<script lang="ts">
    export let color: string = "transparent";
    export let onClick: () => void;
    export let selected: boolean = false;
    export let openSlot: boolean = false;
    export let onUpdateColor: (color:HEX)=>void;

    let selectedColor: HTMLInputElement;

    let colorSelected = () => onUpdateColor(selectedColor.value as HEX)
</script>

<button
    on:click={onClick}
    class={"relative w-9 h-9 flex items-center justify-center drop-shadow-sm border-2 rounded-sm " + (selected ? "border-white-500" : "border-neutral-900")} 
    style={`background-color:${color}`}
>
    {#if openSlot}
    <div class="group-hover">
        <input type="color" bind:this={selectedColor} class="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer" on:change={colorSelected}>
        <img src="/plus.svg" alt="Plus Icon" class="h-5"/>
    </div>
    {/if}
</button>
