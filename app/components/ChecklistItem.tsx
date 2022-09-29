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
import { useEffect, useState } from "react";
import { updateItemApi, changeItemNameApi, deleteItemApi } from "../data/api";
import { checklistItemsAtom, listUpdatedCounterAtom } from "../data/store";
import { deleteItemHandler, checkItemHandler } from "../data/eventHandlers";
import { SetStateAction, useAtom } from "jotai";
import { type ItemModel } from "../data/DTOs";

interface ChecklistItemProps {
  item: ItemModel;
}

function ChecklistItem({ item }: ChecklistItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChecked, setIsChecked] = useState(item.is_completed);
  const [listUpdatedCounter, setListUpdatedCounter] = useAtom(
    listUpdatedCounterAtom
  );

  /**
   *
   * @param itemId
   */
  async function handleCheckboxChange(newIsChecked: boolean) {
    setIsUpdating(true);

    const updatedItem = await checkItemHandler(item.id, newIsChecked);

    setIsChecked(updatedItem.is_completed);
    setIsUpdating(false);
  }

  /**
   *
   * @param itemId
   */
  async function handleDeleteItem(itemId: number) {
    setIsUpdating(true);
    await deleteItemHandler(itemId);

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
                isChecked={isChecked}
                onChange={e => handleCheckboxChange(e.target.checked)}
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
              textDecorationLine={isChecked ? "line-through" : "none"}
              fontSize="xl"
              flexGrow={1}
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
