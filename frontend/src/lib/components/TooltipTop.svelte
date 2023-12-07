<script lang="ts">
    export let text: string;
</script>

<div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 text-white text-[10px] leading-[14px] font-semibold px-2 py-[2px] whitespace-nowrap"
>
    {text}
    <div
        class="absolute left-1/2 -translate-x-1/2 -translate-y-[1px] top-full border-solid border-t-blue-500 border-t-4 border-x-transparent border-x-4 border-b-0"
    ></div>
</div>
