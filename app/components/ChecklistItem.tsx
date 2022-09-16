import {
  Checkbox,
  Text,
  Spinner,
  Flex,
  Stack,
  HStack,
  Spacer,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  Input,
  Fade,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { updateItemApi, changeItemNameApi, deleteItemApi } from "../data/api";
import { checklistItemsAtom, listUpdatedCounterAtom } from "../data/store";
import { deleteItemHandler, checkItemHandler } from "../data/eventHandlers";
import { SetStateAction, useAtom } from "jotai";
import { type ItemModel } from "../data/DTOs";

interface ChecklistItemProps {
  item: ItemModel;
  checklistItems: ItemModel[];
  setChecklistItems: (update: SetStateAction<ItemModel[]>) => void;
  isNewChecklist: boolean;
}

function ChecklistItem({
  item,
  checklistItems,
  setChecklistItems,
  isNewChecklist,
}: ChecklistItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [listUpdatedCounter, setListUpdatedCounter] = useAtom(
    listUpdatedCounterAtom
  );

  async function handleCheckboxChange(isChecked: boolean, itemId: number) {
    setIsUpdating(true);

    // use server state update only if it's not new checklist
    await checkItemHandler(itemId, isChecked);
    // update on client because checkbox is lagging if waiting for server
    const newChecklist = checklistItems.map(item => {
      if (item.id === itemId) {
        item.is_completed = isChecked;
        return item;
      }
      return item;
    });
    setChecklistItems(newChecklist);

    setListUpdatedCounter(listUpdatedCounter + 1);
    setIsUpdating(false);
  }

  async function handleDeleteItem(itemId: number) {
    setIsUpdating(true);
    await deleteItemHandler(itemId);

    // update on client because checkbox is lagging if waiting for server
    const newChecklist = checklistItems.filter(item => item.id !== itemId);
    setChecklistItems(newChecklist);

    setIsUpdating(false);
    setListUpdatedCounter(listUpdatedCounter + 1);
  }

  return (
    <>
      <Fade in>
        <HStack>
          {isUpdating ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <Checkbox
                key={item.id}
                isChecked={item.is_completed}
                onChange={e => handleCheckboxChange(e.target.checked, item.id)}
              />
            </>
          )}
          <Editable
            defaultValue={item.task_name}
            display="flex"
            isPreviewFocusable={false}
            width={"full"}
            onSubmit={newName => changeItemNameApi(newName, item.id)}
            submitOnBlur={false}
          >
            <EditablePreview
              textDecorationLine={item.is_completed ? "line-through" : "none"}
              fontSize="xl"
              flexGrow={1}
              onClick={e => (item.is_completed = !item.is_completed)}
            />
            <Input as={EditableInput} variant="flushed" fontSize={"xl"} />
            <EditableControls />
          </Editable>
          <IconButton
            aria-label="delete checklist item"
            icon={<DeleteIcon />}
            variant="link"
            onClick={e => handleDeleteItem(item.id)}
          />
        </HStack>
      </Fade>
    </>
  );
}

function EditableControls() {
  const {
    isEditing,
    getEditButtonProps,
    getCancelButtonProps,
    getSubmitButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <>
      <IconButton
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
        aria-label="save edit"
        variant={"link"}
      />
      <IconButton
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
        aria-label="cancel edit"
        variant={"link"}
      />
    </>
  ) : (
    <IconButton
      aria-label="delete checklist item"
      icon={<EditIcon />}
      variant="link"
      {...getEditButtonProps()}
    />
  );
}

export default ChecklistItem;
