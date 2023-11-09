<script lang="ts">
    export let icon: string;
    export let onClick: () => void;
    export let filled: boolean = false;
</script>

<button
    on:click={onClick}
    class={"w-9 h-9 flex items-center justify-center drop-shadow-sm " +
        (filled ? "border-2 border-neutral-900 bg-neutral-900" : " border-2 border-neutral-900")}
>
    <img src={icon} alt="Button Icon" class="h-4" />
</button>
