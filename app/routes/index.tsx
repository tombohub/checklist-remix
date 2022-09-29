import Layout from "../components/Layout";
import { useAtom } from "jotai";
import {
  checklistItemsAtom,
  checklistTitleAtom,
  isFirstItemAtom,
} from "../data/store";
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
  const [isFirstItem, setIsFirstItem] = useAtom(isFirstItemAtom);

  return (
    <>
      <Layout isFirstItem={true}></Layout>
    </>
  );
}

export default Home;
