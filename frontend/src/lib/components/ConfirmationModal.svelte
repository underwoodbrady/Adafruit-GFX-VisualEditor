<script lang="ts">
    import TextButton from "$lib/components/TextButton.svelte";
    import Modal from "$lib/containers/Modal.svelte";

	export let title: string;
	export let text: string;
	export let actionText: string = 'Continue';
	export let cancelText: string = 'Go Back';
	export let onPressAction: () => void = () => {};
	export let onPressCancel: () => void = () => {};
	export let cancelButton: boolean = true;

</script>
<Modal>
    <div class="flex flex-col justify-between h-full flex-1">
        <div class="flex flex-col space-y-2 mb-8">
            <h2 class="font-semibold text-xl">{title}</h2>
            <p class="text-neutral-700">{text}</p>
        </div>
        <div class="flex ml-auto items-center space-x-4">
            {#if cancelButton}
                <TextButton text={cancelText} icon={"/undo.svg"} onClick = {onPressCancel}/>
            {/if}
                <TextButton text={actionText} icon={"/delete-white.svg"} onClick = {onPressAction} filled/>
        </div>
    </div>
</Modal>
