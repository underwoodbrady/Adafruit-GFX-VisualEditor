<script lang="ts">
    export let icon: string;
    export let onClick: () => void;
    export let selected: boolean = false;
    export let additionalInfo: boolean = false;
</script>

<button
    on:click={onClick}
    class={"relative w-12 h-12 flex items-center justify-center drop-shadow-sm border-2 rounded-sm bg-neutral-200 " +
        (selected ? "border-white" : "border-neutral-900")}
>
    <img src={icon} alt="Tool Icon" class="h-6" />
    {#if additionalInfo}
        <div
            class="absolute w-3 h-3 rounded-full bg-blue-500 -top-2 -right-2"
        ></div>
    {/if}
</button>
