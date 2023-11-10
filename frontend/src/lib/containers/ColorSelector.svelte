<script lang="ts">
    import Color from "$lib/components/Color.svelte";
    type HEX = `#${string}`;

    export let colors:HEX[];
    export let selectedColor:HEX;
    export let updateSelectedColor:(color:HEX)=>void;
</script>

{#each colors as color}
    <Color onClick={() => {updateSelectedColor(color)}} color={color} selected ={color == selectedColor && color != "#"} openSlot={color == "#"} />
{/each}

