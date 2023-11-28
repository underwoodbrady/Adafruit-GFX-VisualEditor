<script lang="ts">
    export let text: string;
</script>

<div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 text-white text-[10px] leading-[14px] font-semibold px-2 py-[2px] whitespace-nowrap"
>
    {text}
    <div
        class="absolute left-1/2 -translate-x-1/2 translate-y-[1px] bottom-full border-solid border-b-neutral-900 border-b-4 border-x-transparent border-x-4 border-t-0"
    ></div>
</div>
