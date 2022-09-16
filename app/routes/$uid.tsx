import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import {
  checklistItemsAtom,
  listUpdatedCounterAtom,
  checklistTitleAtom,
} from "../data/store";
import { getChecklistItemsApi, getChecklistTitleApi } from "../data/api";

import { useEffect } from "react";
import Layout from "../components/Layout";

type Params = {
  uid: string;
};

function Checklist() {
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

  return (
    <>
      <Layout
        checklistItems={checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={false}
        uid={uid}
      ></Layout>
    </>
  );
}

export default Checklist;
