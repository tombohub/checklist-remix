import Layout from "../components/Layout";
import { useAtom } from "jotai";
import { checklistItemsAtom, checklistTitleAtom } from "../data/store";
import { useEffect } from "react";
import { useLoaderData } from "@remix-run/react";
import { Button } from "@chakra-ui/react";

export async function loader() {
  return "load data";
}

function Home() {
  const data = useLoaderData();
  const [checklistItems, setChecklistItems] = useAtom(checklistItemsAtom);
  const [checklistTitle, setChecklistTitle] = useAtom(checklistTitleAtom);

  /**
   * in case of back button
   */
  useEffect(() => {
    setChecklistItems([]);
    setChecklistTitle(null);
  }, []);

  return (
    <>
      {data}
      <Layout
        checklistItems={checklistItems}
        setChecklistItems={setChecklistItems}
        isFirstItem={true}
      ></Layout>
    </>
  );
}

export default Home;
