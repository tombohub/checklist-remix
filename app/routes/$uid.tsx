import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import {
  checklistItemsAtom,
  listUpdatedCounterAtom,
  checklistTitleAtom,
} from "../data/store";
import { getChecklistItemsApi, getChecklistTitleApi } from "../data/api";

import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, LoaderArgs } from "@remix-run/node";
import Layout from "../components/Layout";
import { Stack } from "@chakra-ui/react";
import ChecklistItem from "~/components/ChecklistItem";
import { ItemModel } from "~/data/DTOs";
import { loadChecklistItems, loadChecklistTitle } from "~/data/loaders";

type Params = {
  uid: string;
};

interface PageData {
  uid: string;
  checklistItems: ItemModel[];
  checklistTitle: string | null;
  isFirstItem: boolean;
}

export const loader: LoaderFunction = async ({ params }): Promise<PageData> => {
  if (params.uid) {
    const checklistItems = await loadChecklistItems(params.uid);
    const checklistTitle = await loadChecklistTitle(params.uid);
    const pageData: PageData = {
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
  const pageData = useLoaderData<PageData>();
  console.log(pageData);
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);

  function todoListSorter(a: ItemModel, b: ItemModel) {
    return a.id - b.id;
  }

  return (
    <>
      <Layout
        checklistItems={pageData.checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={pageData.isFirstItem}
        uid={pageData.uid}
        checklistTitle={pageData.checklistTitle}
      >
        <Stack direction={"column"} padding={"4"} spacing={"4"}>
          {pageData.checklistItems.sort(todoListSorter).map(task => (
            <>
              <ChecklistItem
                item={task}
                checklistItems={pageData.checklistItems}
                setChecklistItems={setChecklistItems}
                isNewChecklist
                key={task.id}
              />
            </>
          ))}
        </Stack>
      </Layout>
    </>
  );
}

export default Checklist;
