import { writable, type Writable } from "svelte/store";
import type CanvasOb from "../../classes/CanvasOb";

export const objectListWritable: Writable<CanvasOb[]> = writable([]);
