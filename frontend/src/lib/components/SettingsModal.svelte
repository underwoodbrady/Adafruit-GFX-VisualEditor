<script lang="ts">
    import TextButton from "$lib/components/TextButton.svelte";
    import Modal from "$lib/containers/Modal.svelte";
    import Toggle from "./Toggle.svelte";

	export let actionText: string = 'Continue';
	export let cancelText: string = 'Go Back';
	export let onPressAction: () => void = () => {};
	export let onPressCancel: () => void = () => {};
	export let cancelButton: boolean = true;

</script>
<Modal>
    <div class="flex flex-col justify-between h-full flex-1">
        <div class="flex flex-col space-y-4 mb-8">
            <h2 class="font-semibold text-xl">Settings</h2>
            <form class="flex flex-col space-y-2">
                <div class="flex justify-between">
                    <label for="scaleX" class="text-neutral-700">ScaleX</label>
                    <input id="scaleX" class="w-12 rounded-sm bg-neutral-100"/>
                    <label for="scaleY "class="text-neutral-700">ScaleY</label>
                    <input id="scaleX" class="w-12 rounded-sm bg-neutral-100"/>
                    <p class="text-neutral-700">Sync</p>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-neutral-700">Use Color</p>
                    <Toggle/>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-neutral-700">Generate Verbose Code</p>
                    <Toggle/>
                </div>
                <div class="flex items-center justify-between">
                    <p class="text-neutral-700">Show "Smart" Objects (beta)</p>
                    <Toggle/>
                </div>
            </form>
        </div>
        <div class="flex ml-auto items-center space-x-4">
            {#if cancelButton}
                <TextButton text={cancelText} icon={"/undo.svg"} onClick = {onPressCancel}/>
            {/if}
                <TextButton text={actionText} icon={"/save.svg"} onClick = {onPressAction} filled/>
        </div>
    </div>
</Modal>
