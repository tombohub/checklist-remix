import { getChecklistItemsApi, getChecklistTitleApi } from "./api";

export async function loadChecklistTitle(uid: string) {
  const result = await getChecklistTitleApi(uid);
  if (!result) {
    throw new Response("Not found", { status: 404 });
  }
  const checklistTitle = result[0].title;
  return checklistTitle;
}

export async function loadChecklistItems(uid: string) {
  const result = await getChecklistItemsApi(uid);

  if (!result) {
    throw new Response("No checklist items", { status: 404 });
  }
  return result;
}
