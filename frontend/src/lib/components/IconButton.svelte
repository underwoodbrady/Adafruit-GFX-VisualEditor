<script lang="ts">
    export let icon: string;
    export let onClick: () => void;
    export let filled: boolean = false;
    export let disabled:boolean = false;
</script>

{#if disabled}
<button
    on:click={onClick}
    class={"w-9 h-9 flex items-center justify-center drop-shadow-sm border-2 border-neutral-900/70 rounded-sm "}
        {disabled}
>
    <img src={icon} alt="Button Icon" class="h-4 opacity-70" />
</button>
{:else}
<button
    on:click={onClick}
    class={"w-9 h-9 flex items-center justify-center drop-shadow-sm  border-neutral-900 border-2 duration-75 rounded-sm " +
        (filled ? "bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-600 " : " hover:bg-white/20 hover:border-neutral-600")}
>
    <img src={icon} alt="Button Icon" class="h-4" />
</button>
{/if}