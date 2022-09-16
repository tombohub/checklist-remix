import Layout from "../components/Layout";
import { useAtom } from "jotai";
import { checklistItemsAtom, checklistTitleAtom } from "../data/store";
import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import { type ItemModel } from "~/data/DTOs";
import { Button } from "@chakra-ui/react";

interface PageData {
  isFirstItem: boolean;
  checklistItems: ItemModel[];
}

export async function loader() {
  const pageData: PageData = { isFirstItem: true, checklistItems: [] };
  return pageData;
}

function Home() {
  const pageData = useLoaderData<PageData>();
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);
  const [checklistTitle, setChecklistTitle] = useAtom(checklistTitleAtom);

  /**
   * in case of back button
   */
  useEffect(() => {
    setChecklistTitle(null);
  }, []);
  console.log(pageData);
  return (
    <>
      <Layout
        checklistItems={pageData.checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={pageData.isFirstItem}
      ></Layout>
    </>
  );
}

export default Home;
