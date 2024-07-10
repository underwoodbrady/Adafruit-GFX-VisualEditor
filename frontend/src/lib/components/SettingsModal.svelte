<script lang="ts">
    import TextButton from "$lib/components/TextButton.svelte";
    import Modal from "$lib/containers/Modal.svelte";
    import Toggle from "./Toggle.svelte";

    export let actionText: string = "Continue";
    export let cancelText: string = "Go Back";
    export let onPressAction: () => void = () => {};
    export let onPressCancel: () => void = () => {};
    export let cancelButton: boolean = true;
    export let settingsOb:any;
</script>

<Modal>
    <div class="flex flex-col justify-between h-full flex-1">
        <div class="flex flex-col space-y-4 mb-8">
            <h2 class="font-semibold text-xl">Settings</h2>
            <form class="flex flex-col space-y-2">
                <div class="flex justify-between">
                    <label for="customScale" class="text-neutral-700">Custom Scale</label>
                    <input id="customScale" class="w-8 rounded-sm bg-neutral-100 text-right" placeholder="2x" />
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-neutral-700">Use Full Color</p>
                    <Toggle />
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-neutral-700">Use Verbose Code</p>
                    <Toggle />
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-neutral-700">Show Compound Objects</p>
                    <Toggle />
                </div>
            </form>
        </div>
        <div class="flex ml-auto items-center space-x-4">
            {#if cancelButton}
                <TextButton
                    text={cancelText}
                    icon={"/undo.svg"}
                    onClick={onPressCancel}
                />
            {/if}
            <TextButton
                text={actionText}
                icon={"/save.svg"}
                onClick={onPressAction}
                filled
            />
        </div>
    </div>
</Modal>
