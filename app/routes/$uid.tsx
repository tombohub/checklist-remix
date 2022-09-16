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

type Params = {
  uid: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  return params.uid;
};

function Checklist() {
  const data = useLoaderData();
  const { uid } = useParams<Params>();
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);
  const [checklistTitle, setChecklistTitle] = useAtom(checklistTitleAtom);
  const [listUpdatedCounter] = useAtom(listUpdatedCounterAtom);

  useEffect(() => {
    async function fetch() {
      if (uid) {
        const data = await getChecklistTitleApi(uid);
        data && setChecklistTitle(data[0].title);
      }
    }

    fetch().catch(err => console.error(err));
  }, []);

  useEffect(() => {
    async function fetch() {
      if (uid) {
        const data = await getChecklistItemsApi(uid);
        data && setChecklistItems(data);
      }
    }

    fetch().catch(err => console.error(err));
  }, [listUpdatedCounter]);

  function todoListSorter(a: ItemModel, b: ItemModel) {
    return a.id - b.id;
  }

  return (
    <>
      <Layout
        checklistItems={checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={false}
        uid={uid}
      >
        <Stack direction={"column"} padding={"4"} spacing={"4"}>
          {checklistItems &&
            checklistItems.sort(todoListSorter).map(task => (
              <>
                <ChecklistItem
                  item={task}
                  checklistItems={checklistItems}
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
