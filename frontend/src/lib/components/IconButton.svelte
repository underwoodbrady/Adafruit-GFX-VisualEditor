<script lang="ts">
    export let icon: string;
    export let onClick: () => void;
    export let filled: boolean = false;
</script>

<button
    on:click={onClick}
    class={"w-9 h-9 flex items-center justify-center drop-shadow-sm  border-neutral-900 duration-75 rounded-sm " +
        (filled ? "border-2 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-600 " : " border-2 hover:bg-white/20 hover:border-neutral-600")}
>
    <img src={icon} alt="Button Icon" class="h-4" />
</button>
