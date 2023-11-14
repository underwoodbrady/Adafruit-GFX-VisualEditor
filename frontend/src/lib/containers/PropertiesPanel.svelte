<script lang="ts">
    import type CanvasOb from "../../classes/CanvasOb";

    export let selectedObject: CanvasOb;
    export let updateSelectedObject: (ob: CanvasOb) => void;
    export let canvasTrueWidth: number;
    export let canvasTrueHeight: number;

    type objectKeys = keyof CanvasOb;

    let selectedColor: HTMLInputElement;
    
    let checkCanvasBoundries = (x:number, y:number, w:number, h:number):boolean => {
        if(x+w>= canvasTrueWidth || y+h >= canvasTrueHeight || x<0 || y<0 || w<0 || h<0){
            alert(`The values given don't fit within the canvas`)
            return false
        }
        return true;
    }

    //These functions are so ugly don't look... Honestly shocking they work as well as they do
    let numberChanged = (change:any, key: objectKeys) => {
        console.log((change.target as HTMLInputElement).value);
        let so = selectedObject;
        so[key] = Number((change.target as HTMLInputElement).value)
        if(checkCanvasBoundries(so.x, so.y, so.w, so.h))
            updateSelectedObject(so)
    };

    let colorChanged = (change: any, key:objectKeys) =>{
        console.log(change);
        let so = selectedObject;
        so[key] = change;
        updateSelectedObject(so)
    }
</script>

<div class="flex space-x-2 items-center">
    <img src="/properties.svg" alt="Properties Icon" class="w-4" />
    <p class="text-sm font-semibold mb-[2px]">Properties</p>
</div>

{#if selectedObject}
    <div class="mt-4 text-sm flex-col space-y-2">
        {#each Object.keys(selectedObject) as key}
            {#if key == "shape" || key == "type"}
                <span></span>
            {:else if key == "color"}
                <p class="font-semibold w-5">
                    {key}:
                </p>
                <input
                    type="color"
                    value={selectedObject[key]}
                    class="bg-white border border-neutral-900 w-full"
                    bind:this = {selectedColor}
                    on:change={() => {
                        colorChanged(selectedColor.value, key);
                    }}
                />
            {:else}
                <div class="flex space-x-2">
                    <p class="font-semibold w-5">
                        {key}:
                    </p>
                    <input
                        type="number"
                        value={selectedObject[key]}
                        class="bg-white border border-neutral-900 w-full"
                        on:change={(change) => {
                            numberChanged(change, key);
                        }}
                    />
                </div>
            {/if}
        {/each}
    </div>
{:else}
    <p class="text-center text-neutral-700 mt-6 text-xs">Select Object</p>
{/if}
