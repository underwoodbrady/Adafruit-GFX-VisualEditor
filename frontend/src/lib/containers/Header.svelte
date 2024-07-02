<script lang="ts">
    import Tooltip from "$lib/components/Tooltip.svelte";
    import ScreenDropdown from "./ScreenDropdown.svelte";
    import type displayToLib from "../../utils/displayToLib.json";
    export let setChoosenDisplay:(display:keyof typeof displayToLib)=>void;
    export let setCustomDisplay: (display: {
        width:number,
        height:number,
        library:string
    }) => void = () => {};

    export let choosenDisplay: string = "Select Display";
    export let displays: typeof displayToLib;
    export let dropdownOpen: boolean = false;
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
            <li>
               <ScreenDropdown {choosenDisplay} {displays} {setChoosenDisplay} {setCustomDisplay} {dropdownOpen}/>
            </li>
            <li class="flex items-center space-x-2 relative group">
                <img
                    src="/microcontroller.svg"
                    alt="Microcontroller"
                    class="w-4 mt-[2px]"
                />
                <p class="text-neutral-500 text-sm">Select Microcontroller</p>
                <img
                    src="/down-arrow-grey.svg"
                    alt="Down Arrow"
                    class="w-2 mt-[2px]"
                />
                <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 hidden group-hover:inline-block">
                    <Tooltip text="Coming soon"/>
                </div>
            </li>
        </ul>
    </nav>
    <a
        href="https://github.com/underwoodbrady/Adafruit-GFX-VisualEditor"
        target="_blank"
        class="flex items-center space-x-2 p-2 -m-2 hover:bg-neutral-200 duration-75 rounded-sm"
    >
        <img src="/github.svg" alt="Github Logo" class="h-4" />
        <p class="text-sm"> v0.0.8</p>
    </a>
</header>
