<script lang="ts">
    import { afterUpdate } from "svelte";
    import type CanvasOb from "../../classes/CanvasOb";
    import { canvasRedraws, objectListWritable } from "./objectList";
    import type Text from "../../classes/shapes/Text";

    export let selectedObject: CanvasOb | undefined;
    export let canvasTrueWidth: number;
    export let canvasTrueHeight: number;

    type objectKeys = keyof CanvasOb;

    let selectedColor: HTMLInputElement;

    let textInput: HTMLInputElement;

    //TODO: Make this actually work
    let checkCanvasBoundries = (
        x: number,
        y: number,
        w: number,
        h: number
    ): boolean => {
        if (
            x + w >= canvasTrueWidth ||
            y + h >= canvasTrueHeight ||
            x < 0 ||
            y < 0 ||
            w < 0 ||
            h < 0
        ) {
            alert(`The values given don't fit within the canvas`);
            return false;
        }
        return true;
    };

    //These functions are so ugly don't look... Honestly shocking they work
    let numberChanged = (change: any, key: objectKeys) => {
        console.log((change.target as HTMLInputElement).value);
        let so = selectedObject;
        so[key] = Number((change.target as HTMLInputElement).value);
        if (checkCanvasBoundries(so.x, so.y, so.w, so.h))
            canvasRedraws.update(canvasRedraws=>canvasRedraws+1);
    };

    let stringChanged = (change: any, key: objectKeys) => {
        console.log((change.target as HTMLInputElement).value);
        let so = selectedObject;
        so[key] = String((change.target as HTMLInputElement).value);
        canvasRedraws.update(canvasRedraws=>canvasRedraws+1);
    };

    let colorChanged = (change: any, key: objectKeys) => {
        console.log(change);
        let so = selectedObject;
        so[key] = change;
        canvasRedraws.update(canvasRedraws=>canvasRedraws+1);
    };

    let deleteObject = ()=>{
       objectListWritable.update((currentVal)=>currentVal.filter((object)=>object!=selectedObject))
    }

    let duplicateObject = ()=>{
        alert("Feature coming soon...")
        //TODO: Implement, this is harder than I thought it would be
        // if(selectedObject == undefined) return
        // let newObjList = $objectListWritable;
        // objectListWritable.set(newObjList);
    }

    afterUpdate(() => {
        if (selectedObject) {
            if (selectedObject.shape == "text") {
                textInput.value = (selectedObject as Text).text;
                textInput.focus();
            }
        }
    });
</script>

<section class="flex flex-col space-y-2 min-h-full">
    <div class="flex space-x-2 items-center">
        <img src="/properties.svg" alt="Properties Icon" class="w-4" />
        <p class="text-sm font-semibold">Properties</p>
    </div>

    {#if selectedObject}
        <div class="mt-4 flex flex-col flex-1 justify-between">
            <div class="text-sm flex-col space-y-2">
                {#each Object.keys(selectedObject) as key}
                    {#if key == "shape" || key == "type"}
                        <span />
                    {:else if key == "color"}
                        <div class="flex space-x-2">
                            <p class="font-semibold w-16">c:</p>
                            <input
                                type="color"
                                value={selectedObject.color}
                                class="w-full h-[20px]"
                                bind:this={selectedColor}
                                on:change={() => {
                                    colorChanged(selectedColor.value, "color");
                                }}
                            />
                        </div>
                    {:else if key == "text"}
                        <div class="flex space-x-2">
                            <p class="font-semibold w-16">
                                {key}:
                            </p>
                            <input
                                type="text"
                                value={selectedObject[key]}
                                bind:this={textInput}
                                class="bg-neutral-200 w-full text-right"
                                on:change={(change) => {
                                    stringChanged(change, key);
                                }}
                            />
                        </div>
                    {:else if key == "scale"}
                        <div class="flex space-x-2">
                            <p class="font-semibold w-16">
                                {key}:
                            </p>
                            <input
                                type="number"
                                min="0"
                                max="2"
                                value={selectedObject[key]}
                                class="bg-neutral-200 w-full text-right"
                                on:change={(change) => {
                                    numberChanged(change, key);
                                }}
                            />
                        </div>
                    {:else}
                        <div class="flex space-x-2">
                            <p class="font-semibold w-16">
                                {key}:
                            </p>
                            <input
                                type="number"
                                value={selectedObject[key]}
                                class="bg-neutral-200 w-full text-right rounded-sm"
                                on:change={(change) => {
                                    numberChanged(change, key);
                                }}
                            />
                        </div>
                    {/if}
                {/each}
            </div>
            <div class="flex-col space-y-2 mt-4">
                <button
                    class="w-full h-7 px-2 border-2 border-neutral-900 font-semibold text-xs flex space-x-2 items-center justify-center"
                    on:click={deleteObject}
                >
                    <img src="/delete.svg" alt="Delete Icon" class="h-3" />
                    <p>Delete</p>
                </button>
                <button
                    class="w-full h-7 px-2 bg-neutral-900 text-white font-semibold text-xs flex space-x-2 items-center justify-center"
                    on:click={duplicateObject}
                >
                    <img src="/copy-white.svg" alt="Delete Icon" class="h-3" />

                    <p>Duplicate</p>
                </button>
            </div>
        </div>
    {:else}
        <p class="text-center text-neutral-700 pt-4 text-xs">
            Select Object With () Tool
        </p>
    {/if}
</section>
