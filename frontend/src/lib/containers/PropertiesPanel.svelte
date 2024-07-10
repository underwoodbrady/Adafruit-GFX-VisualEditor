<script lang="ts">
    import { afterUpdate } from "svelte";
    import type CanvasOb from "../../classes/CanvasOb";
    import { canvasRedraws, objectListStatesWritable, objectListWritable } from "./objectList";
    import type Text from "../../classes/shapes/Text";
    import IconButton from "$lib/components/IconButton.svelte";
    import { type Writable } from "svelte/store";

    export let selectedObject: Writable<CanvasOb | undefined>;
    export let canvasTrueWidth: number;
    export let canvasTrueHeight: number;

    type objectKeys = keyof CanvasOb;

    let selectedColor: HTMLInputElement;

    let textInput: HTMLInputElement;

    type menus = "properties" | "layers";

    let selectedMenu: menus = "properties";

    //TODO: Make this actually work
    let checkCanvasBoundries = (
        x: number,
        y: number,
        w: number,
        h: number,
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
        if ($selectedObject == undefined) return;
        console.log((change.target as HTMLInputElement).value);
        let so = $selectedObject;
        so[key] = Number((change.target as HTMLInputElement).value);
        if (checkCanvasBoundries(so.x, so.y, so.w, so.h))
            canvasRedraws.update((canvasRedraws) => canvasRedraws + 1);
    };

    let stringChanged = (change: any, key: objectKeys) => {
        console.log((change.target as HTMLInputElement).value);
        let so = $selectedObject;
        so[key] = String((change.target as HTMLInputElement).value);
        canvasRedraws.update((canvasRedraws) => canvasRedraws + 1);
    };

    let colorChanged = (change: any, key: objectKeys) => {
        console.log(change);
        let so = $selectedObject;
        so[key] = change;
        canvasRedraws.update((canvasRedraws) => canvasRedraws + 1);
    };

    let deleteObject = () => {
        if($objectListStatesWritable[1] == $objectListStatesWritable[0].length-1){
            //If at the end but nothing changed reset index to -1
            $objectListStatesWritable[1] = -1
            $objectListStatesWritable = $objectListStatesWritable;
        }else if($objectListStatesWritable[1] != -1){
            //If anywhere else than -1 reset the objectliststate
            objectListStatesWritable.set([[[]],-1]);
        }
        objectListWritable.update((currentVal) =>
            currentVal.filter((object) => object != $selectedObject),
        );
    };

    let duplicateObject = () => {
        alert("Feature coming soon...");
        //TODO: Implement, this is harder than I thought it would be
        // if(selectedObject == undefined) return
        // let newObjList = $objectListWritable;
        // objectListWritable.set(newObjList);
    };

    let checkedObjects: CanvasOb[] = [];

    let objectChecked = (object: CanvasOb, checked: boolean) => {
        selectedObject.set(object);

        if (checked) {
            checkedObjects.push(object);
            return;
        }
        checkedObjects.splice(checkedObjects.indexOf(object), 1);

    };

    let checkedObjectsDelete = () => {
        objectListWritable.update((currentVal) =>
            currentVal.filter((object) => !checkedObjects.includes(object)),
        );
    };

    //TODO: see if there is a faster way
    let checkedObjectsMove = (moveUp: boolean) => {
        let newObList = [...$objectListWritable];
        checkedObjects.sort((ob1, ob2) => { //Corrects order of operations on movement (if going up the higher object moves first and visa versa)
            if (newObList.indexOf(ob1) > newObList.indexOf(ob2))
                return moveUp ? -1 : 1;
            if (newObList.indexOf(ob1) < newObList.indexOf(ob2))
                return moveUp ? 1 : -1;
            return 0;
        });
        for (let i: number = 0, e: number = checkedObjects.length; i < e; i++) {
            const currentCheckedOb = checkedObjects[i],
                currentCheckedObIndex = newObList.indexOf(currentCheckedOb);

            if (
                (moveUp &&
                    currentCheckedObIndex + 1 == $objectListWritable.length) ||
                (!moveUp && currentCheckedObIndex == 0)
            )
                return; //Can't move up if already at top

            let newObIndex = currentCheckedObIndex + (moveUp ? 1 : -1);

            newObList.splice(currentCheckedObIndex, 1); //Remove old object

            newObList = [
                ...newObList.slice(0, newObIndex),
                currentCheckedOb,
                ...newObList.slice(newObIndex),
            ]; //Paste in new object at new index
        }
        objectListWritable.set(newObList);
    };

    afterUpdate(() => {
        if ($selectedObject) {
            if ($selectedObject.shape == "text" && textInput) {
                textInput.value = ($selectedObject as Text).text;
                textInput.focus();
            }
        }
    });
</script>

<section class="flex flex-col space-y-2 min-h-full w-full">
    <div class="-m-4 mb-2 flex">
        <button
            class={"flex flex-1 space-x-2 justify-center items-center p-2  " +
                (selectedMenu == "properties"
                    ? " "
                    : " bg-neutral-400 border-b border-r border-neutral-500 shadow-inner")}
            on:click={() => (selectedMenu = "properties")}
        >
            <img src="/properties.svg" alt="Properties Icon" class="w-3" />
            <p class="text-xs font-semibold">Properties</p>
        </button>
        <button
            class={"flex space-x-2 justify-center items-center p-2  " +
                (selectedMenu == "layers"
                    ? " "
                    : " bg-neutral-400 border-b border-l border-neutral-500 shadow-inner")}
            on:click={() => {
                selectedMenu = "layers";
                checkedObjects = [];
            }}
        >
            <img src="/layers.svg" alt="Properties Icon" class="w-3" />
            <p class="text-xs font-semibold">Layers</p>
        </button>
    </div>

    {#if selectedMenu == "properties"}
        {#if $selectedObject}
            <div class="mt-4 flex flex-col flex-1 justify-between">
                <div class="text-sm flex-col space-y-2">
                    {#each Object.keys($selectedObject) as key}
                        {#if  key == "id"  || key == "type"}
                            <span />
                        {:else if key == "shape"}
                            <p class="font-medium !mt-0 pb-2">{$selectedObject.stringFormatted()}</p>
                        {:else if key == "color"}
                            <div class="flex space-x-2">
                                <p class="text-neutral-900 w-16">c</p>
                                <input
                                    type="color"
                                    value={$selectedObject.color}
                                    class="w-full h-[20px]"
                                    bind:this={selectedColor}
                                    on:change={() => {
                                        colorChanged(
                                            selectedColor.value,
                                            "color",
                                        );
                                    }}
                                />
                            </div>
                        {:else if key == "text"}
                            <div class="flex space-x-2">
                                <p class="text-neutral-900 w-16">
                                    {key}
                                </p>
                                <input
                                    type="text"
                                    value={$selectedObject[key]}
                                    bind:this={textInput}
                                    class="bg-neutral-200 w-full text-right"
                                    on:change={(change) => {
                                        stringChanged(change, key);
                                    }}
                                />
                            </div>
                        {:else if key == "scale"}
                            <div class="flex space-x-2">
                                <p class="text-neutral-900 w-16">
                                    {key}
                                </p>
                                <input
                                    type="number"
                                    min="0"
                                    max="2"
                                    value={$selectedObject[key]}
                                    class="bg-neutral-200 w-full text-right"
                                    on:change={(change) => {
                                        numberChanged(change, key);
                                    }}
                                />
                            </div>
                        {:else}
                            <div class="flex space-x-2">
                                <p class="text-neutral-900 w-16">
                                    {key}
                                </p>
                                <input
                                    type="number"
                                    value={$selectedObject[key]}
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
                        <img
                            src="/copy-white.svg"
                            alt="Delete Icon"
                            class="h-3"
                        />

                        <p>Duplicate</p>
                    </button>
                </div>
            </div>
        {:else}
            <div class="flex-col space-y-1 pt-4">
                <p class="text-center text-neutral-700 text-xs">
                    Select Object With
                </p>
                <p class="text-center text-neutral-700 text-xs">
                    <img
                        src="/cursor-grey.svg"
                        alt="grey cursor"
                        class="w-2 inline align-middle"
                    /> Tool
                </p>
            </div>
        {/if}
    {:else if selectedMenu == "layers"}
        {#if $objectListWritable.length > 0}
            <div class="flex-1 flex flex-col justify-between">
                <ul class="flex flex-col space-y-1">
                    {#each [...$objectListWritable].reverse() as object (object.id)}
                        <li class="flex items-center justify-between">
                            <div class="flex items-center space-x-1">
                                <div
                                    class="w-3 h-3 rounded-sm"
                                    style={`background-color:${object.color}`}
                                ></div>
                                <p class="text-sm text-neutral-900">
                                    {object.type}
                                    {object.shape}
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                on:change={(e) => {
                                    objectChecked(
                                        object,
                                        e?.target?.checked || false,
                                    );
                                }}
                            />
                        </li>
                    {/each}
                </ul>
                <div class="flex items-center justify-between">
                    <IconButton
                        icon={"/delete.svg"}
                        onClick={checkedObjectsDelete}
                    />
                    <IconButton
                        icon={"/down.svg"}
                        onClick={() => checkedObjectsMove(false)}
                        filled
                    />
                    <IconButton
                        icon={"/up.svg"}
                        onClick={() => checkedObjectsMove(true)}
                        filled
                    />
                </div>
            </div>
        {:else}
            <div class="flex-col space-y-1 pt-4">
                <p class="text-center text-neutral-700 text-xs">
                    No Layers Currently
                </p>
            </div>
        {/if}
    {/if}
</section>
