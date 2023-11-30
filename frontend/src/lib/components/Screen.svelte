<script lang="ts">
    export let name:string;
    export let details: string;
    export let library: string;
    export let onClick: ()=>void;
</script>

<li >
    <button on:click={onClick} class="px-2 py-2 w-full hover:bg-neutral-200 flex flex-col items-start cursor-pointer space-y-1">
        <div class="flex space-x-1 items-center">
            <p class="text-sm font-medium whitespace-nowrap text-neutral-900">{name} </p>
            <p class="text-[10px] leading-3 text-neutral-500 italic">
                {"<"}{library}{">"}
            </p>
        </div>
        <p class="text-xs text-neutral-700">{details}</p>
    </button>
</li>
