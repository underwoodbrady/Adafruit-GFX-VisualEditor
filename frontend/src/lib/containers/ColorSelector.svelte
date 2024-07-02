<script lang="ts">
    import Color from "$lib/components/Color.svelte";

    export let colors:HEX[];
    export let selectedColor:HEX;
    export let updateSelectedColor:(color:HEX)=>void;
    export let updateColor:(color:HEX, index:number)=>void;
</script>

{#each colors as color, index}
    <Color onClick={() => {updateSelectedColor(color)}} color={color} selected ={color == selectedColor && color != "#"} openSlot={color == "#"} onUpdateColor={(color) => {updateColor(color, index)}} />
{/each}

