<script lang="ts">
    export let choosenDisplay: string;
</script>

<header
    class="flex justify-between items-center px-8 py-4 border-b border-neutral-400 bg-neutral-300 drop-shadow-sm fixed top-0 left-0 w-full z-50"
>
    <div class="flex items-center space-x-2">
        <img src="/logo.svg" alt="Adafruit GFX Logo" class="h-4" />
        <h1><span class="font-bold">Adafruit GFX</span> - Visual Editor</h1>
    </div>
    <nav>
        <ul class="flex items-center space-x-6">
            <li class="flex items-center space-x-2">
                <img
                    src="/display.svg"
                    alt="Down Arrow"
                    class="h-[15px] mt-[2px]"
                />
                <p class="font-semibold text-sm">{choosenDisplay}</p>
                <img
                    src="/down-arrow.svg"
                    alt="Down Arrow"
                    class="w-2 mt-[2px]"
                />
            </li>
            <li class="flex items-center space-x-2">
                <img
                    src="/microcontroller.svg"
                    alt="Down Arrow"
                    class="w-4 mt-[2px]"
                />
                <p class="text-neutral-500 text-sm">Select Microcontroller</p>
                <img
                    src="/down-arrow-grey.svg"
                    alt="Down Arrow"
                    class="w-2 mt-[2px]"
                />
            </li>
        </ul>
    </nav>
    <button
        on:click={() => {}}
        class="flex items-center space-x-2 p-2 -m-2 cursor-pointer hover:bg-neutral-200 duration-75"
    >
        <img src="/github.svg" alt="Github Logo" class="h-4" />
        <p class="text-sm">Beta V0.2</p>
    </button>
</header>
