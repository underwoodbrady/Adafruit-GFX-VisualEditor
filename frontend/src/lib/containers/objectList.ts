import { writable, type Writable } from "svelte/store";
import type CanvasOb from "../../classes/CanvasOb";

export const objectListWritable: Writable<CanvasOb[]> = writable([]);
//TODO: Maybe implement todo feature here? 
export const selectedObject:Writable<CanvasOb | undefined> = writable();
export const canvasRedraws:Writable<number> = writable(0);
export const objectListStates: Writable<CanvasOb[]> = writable([]);
