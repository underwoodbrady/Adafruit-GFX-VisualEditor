<script lang="ts">
    export let checked:boolean = false;
</script>

<label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" class="sr-only peer" checked={checked}>
    <div class="w-9 h-5 rounded-full peer bg-neutral-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-neutral-400 peer-checked:bg-blue-500"></div>
</label>