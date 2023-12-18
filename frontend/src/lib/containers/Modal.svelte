<!--Pure styling for modal to be reused-->

<div
	class="fixed top-0 left-0 w-full h-full flex flex-wrap items-center justify-center z-50 fade-in-anim select-none"
>
	<div class="bg-neutral-300 -translate-y-full rounded-sm drop-shadow-sm border-2 border-black p-6 w-[480px] min-h-48 flex drop-down-anim">
		<slot/>
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
