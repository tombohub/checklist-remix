import { atom } from "jotai";
import { type ItemModel } from "./DTOs";

export const checklistTitleAtom = atom<string | null>(null);

export const checklistUidAtom = atom<string | null>(null);

export const checklistItemsAtom = atom<ItemModel[]>([]);

export const listUpdatedCounterAtom = atom(0);

export const isFirstItemAtom = atom(false);
