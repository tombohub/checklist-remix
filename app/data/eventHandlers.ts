import { useAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  createChecklistApi,
  addItemApi,
  changeChecklistTitleApi,
  deleteItemApi,
  updateItemApi,
} from "./api";

export async function addFirstItemHandler(
  checklistTitle: string | null,
  itemName: string
) {
  const uid = nanoid(11);
  await createChecklistApi(uid, checklistTitle);
  await addItemApi(itemName, uid);
  return uid;
}

export async function addItemHandler(itemName: string, uid: string) {
  await addItemApi(itemName, uid);
}

export async function changeChecklistTitleHandler(
  title: string | null,
  uid: string
) {
  await changeChecklistTitleApi(title, uid);
}

export async function deleteItemHandler(itemId: number) {
  await deleteItemApi(itemId);
}

export async function checkItemHandler(itemId: number, isChecked: boolean) {
  const updatedItem = await updateItemApi(itemId, isChecked);
  return updatedItem;
}
