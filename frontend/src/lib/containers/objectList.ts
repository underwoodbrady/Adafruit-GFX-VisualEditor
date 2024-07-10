import { writable, type Writable } from "svelte/store";
import type CanvasOb from "../../classes/CanvasOb";

export const objectListWritable: Writable<CanvasOb[]> = writable([]);
export const selectedObject:Writable<CanvasOb | undefined> = writable();
export const canvasRedraws:Writable<number> = writable(0);
//First (0) element is to store the path of states, the second element stores the index when working back through the tree 
export const objectListStatesWritable: Writable<[CanvasOb[][], number]> = writable([[],-1]);