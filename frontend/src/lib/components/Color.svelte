<script lang="ts">
    export let color: string = "transparent";
    export let onClick: () => void;
    export let selected: boolean = false;
    export let openSlot: boolean = false;
</script>

<button
    on:click={onClick}
    class={"relative w-9 h-9 flex items-center justify-center drop-shadow-sm border-2 rounded-sm " + (selected ? "border-white-500" : "border-neutral-900")} 
    style={`background-color:${color}`}
>
    {#if openSlot}
        <img src="/plus.svg" alt="Plus Icon" class="h-5"/>
    {/if}
</button>
