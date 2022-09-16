import { Stack, Box, Button } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import ChecklistItem from "./ChecklistItem";
import ChecklistTitle from "./ChecklistTitle";
import AddItemModal from "./AddItemModal";
import { getChecklistItemsApi, createChecklistApi } from "../data/api";
import { type ItemModel } from "../data/DTOs";
import {
  checklistItemsAtom,
  listUpdatedCounterAtom,
  checklistTitleAtom,
} from "../data/store";
import { useAtom, SetStateAction } from "jotai";
import { useState, useRef, useEffect, ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
  checklistItems: ItemModel[];
  setChecklistItems: (update: SetStateAction<ItemModel[]>) => void;
  isFirstItem: boolean;
  uid?: string | undefined;
}

function Layout({
  children,
  checklistItems,
  setChecklistItems,
  isFirstItem,
  uid,
}: LayoutProps) {
  function todoListSorter(a: ItemModel, b: ItemModel) {
    return a.id - b.id;
  }

  return (
    <>
      <Box padding={"2"} marginTop={"4"}>
        <ChecklistTitle uid={uid} isFirstItem={isFirstItem} />
      </Box>

      <Stack direction={"column"} padding={"4"} spacing={"4"}>
        {isFirstItem
          ? null
          : checklistItems &&
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

      {children}

      <AddItemModal isFirstItem={isFirstItem} uid={uid} />
    </>
  );
}

export default Layout;
