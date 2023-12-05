<script lang="ts">
    import TextButton from "$lib/components/TextButton.svelte";

	export let title: string;
	export let text: string;
	export let actionText: string = 'Continue';
	export let cancelText: string = 'Go Back';
	export let onPressAction: () => void = () => {};
	export let onPressCancel: () => void = () => {};
	export let cancelButton: boolean = true;

</script>

<div
	class="fixed top-0 left-0 w-full h-full flex flex-wrap items-center justify-center z-50 fade-in-anim select-none"
>
	<div class="bg-neutral-300 -translate-y-full rounded-sm drop-shadow-sm border-2 border-black p-6 w-[480px] h-48 space-x-5 flex drop-down-anim">
		<div class="flex flex-col justify-between h-full flex-1 px-1">
			<div class="flex flex-col space-y-2">
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
	</div>	
</div>

<style>
	.fade-in-anim {
		animation-name: fade-in;
		animation-duration: 0.2s;
		animation-direction: normal;
		animation-timing-function: ease-in;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	.drop-down-anim {
		animation-name: drop-down;
		animation-duration: 0.2s;
		animation-delay: 0.05s;
		animation-direction: normal;
		animation-timing-function:ease;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@keyframes fade-in {
		0% {
			background-color: rgba(0,0,0,0);
		}
		100% {
			background-color: rgba(0,0,0,0.25)
		}
	}

	@keyframes drop-down {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0%);
		}
	}
</style>
