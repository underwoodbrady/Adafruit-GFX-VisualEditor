<script lang="ts">
    import Tool from "$lib/components/Tool.svelte";
    import { Tools } from "../../routes/tools";

    type tool = { name: Tools, image: string, special?:boolean, disabled?: boolean };

    export let tools: tool[];
    export let selectedTool: tool;
    export let updateSelectedTool: (tool: tool) => void;

    let hasAdditionalInfo = (tool: tool) =>
        tool.name == "paint-brush" || tool.name == "paint-bucket";
</script>

{#each tools as tool (tool.name)}
    <Tool
        icon={tool.image}
        onClick={() => {
            updateSelectedTool(tool);
        }}
        selected={tool == selectedTool}
        additionalInfo={hasAdditionalInfo(tool)}
        special= {!!tool.special}
        disabled = {!!tool.disabled}
    />
{/each}
