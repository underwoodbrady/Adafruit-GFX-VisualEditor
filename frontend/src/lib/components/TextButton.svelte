<script lang="ts">
    export let icon: string = "";
    export let text: string;
    export let onClick: () => void;
    export let filled: boolean = false;
    export let loading: boolean = false;
    export let small:boolean = false;
</script>

<button
    on:click={onClick}
    class={(small ? "px-2 h-7 w-full flex justify-center items-center font-semibold text-xs space-x-2 drop-shadow-sm border-neutral-900 duration-75 rounded-sm" : "px-4 h-9 flex items-center font-semibold text-sm space-x-2 drop-shadow-sm border-neutral-900 duration-75 ") +
        (filled ? " border-2 bg-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-600 " : " border-2 hover:bg-white/20 hover:border-neutral-600")}
>   {#if loading}
        <img src='/spinner-white.svg' alt="Loading Icon" class={small ? "h-3" : "h-4" + " animate-spin"} />
    {:else if !(icon == "")}
        <img src={icon} alt="Button Icon" class={small ? "h-3" : "h-4"} />
    {/if}
    <p class="mb-[1px]">{text}</p>
</button>
