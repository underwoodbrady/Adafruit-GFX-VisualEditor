import { writable, type Writable } from "svelte/store";
import type CanvasOb from "../../classes/CanvasOb";

export const objectListWritable: Writable<CanvasOb[]> = writable([]);
export const selectedObject:Writable<CanvasOb> = writable();
export const canvasRedraws:Writable<number> = writable(0);
