<script lang="ts">
    import Tooltip from "./Tooltip.svelte";

    export let icon: string;
    export let onClick: () => void;
    export let selected: boolean = false;
    export let additionalInfo: boolean = false;
    export let special: boolean = false;
    export let disabled: boolean = false;
</script>

{#if disabled}
<button
    class="relative w-12 h-12 flex items-center justify-center drop-shadow-sm border-2 rounded-sm bg-neutral-200/40 border-black/40 group"
>
    <img src={icon} alt="Tool Icon" class="h-6 opacity-40" />
    <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:inline-block">
        <Tooltip text="Coming soon"/>
    </div>
</button>

{:else}
<button
    on:click={onClick}
    class={"relative w-12 h-12 flex items-center justify-center drop-shadow-sm border-2 rounded-sm " +
        (selected ? "border-white" : "border-neutral-900") + (special ? " bg-blue-200" : " bg-neutral-200")}
>
    <img src={icon} alt="Tool Icon" class="h-6" />
    {#if additionalInfo}
        <div
            class="absolute w-3 h-3 rounded-full bg-blue-500 -top-2 -right-2 text-[8px] leading-[8px] flex justify-center items-center font-bold text-white"
        >
        i
    </div>
    {/if}
</button>

{/if}

