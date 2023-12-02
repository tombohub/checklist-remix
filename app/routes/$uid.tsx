import { useAtom } from "jotai";
import { checklistItemsAtom } from "../data/store";
import BottomButtonGroup from "~/components/BottomButtonGroup";
import { useLoaderData } from "@remix-run/react";
import { type LoaderFunction } from "@remix-run/node";
import Layout from "../components/Layout";
import { Stack } from "@chakra-ui/react";
import ChecklistItem from "~/components/ChecklistItem";
import { type ItemModel } from "~/data/DTOs";
import { loadChecklistItems, loadChecklistTitle } from "~/data/loaders";

interface LoaderData {
  uid: string;
  checklistItems: ItemModel[];
  checklistTitle: string | null;
  isFirstItem: boolean;
}

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  if (params.uid) {
    const checklistItems = await loadChecklistItems(params.uid);
    const checklistTitle = await loadChecklistTitle(params.uid);
    const pageData: LoaderData = {
      uid: params.uid,
      checklistItems: checklistItems,
      checklistTitle,
      isFirstItem: false,
    };
    return pageData;
  } else {
    throw new Response("no params", { status: 404 });
  }
};

function Checklist() {
  const pageData = useLoaderData<LoaderData>();

  function todoListSorter(a: ItemModel, b: ItemModel) {
    return a.id - b.id;
  }

  return (
    <>
      <Layout isFirstItem={pageData.isFirstItem} uid={pageData.uid}>
        <Stack direction={"column"} spacing={"4"} flexGrow={1}>
          {pageData.checklistItems &&
            pageData.checklistItems.sort(todoListSorter).map(item => (
              <>
                <ChecklistItem item={item} key={item.id} />
              </>
            ))}
        </Stack>
      </Layout>
    </>
  );
}

export default Checklist;
