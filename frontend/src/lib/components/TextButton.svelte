<script lang="ts">
    export let icon: string = "";
    export let text: string;
    export let onClick: () => void;
    export let filled: boolean = false;
</script>

<button
    on:click={onClick}
    class={"px-4 h-9 flex items-center font-semibold text-sm space-x-2 drop-shadow-sm " +
        (filled ? "border-2 border-neutral-900 bg-neutral-900 text-white" : " border-2 border-neutral-900")}
>
    {#if !(icon == "")}
        <img src={icon} alt="Button Icon" class="h-4" />
    {/if}
    <p class="mb-[1px]">{text}</p>
</button>
