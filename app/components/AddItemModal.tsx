import { useRef, useState } from "react";
import AddFirstItemButton from "./AddFirstItemButton";
import {
  Button,
  Fade,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import {
  checklistItemsAtom,
  checklistTitleAtom,
  checklistUidAtom,
  isFirstItemAtom,
  listUpdatedCounterAtom,
} from "../data/store";
import { addFirstItemHandler, addItemHandler } from "../data/eventHandlers";
import AddItemButton from "./AddItemButton";

function AddItemModal() {
  const [isFirstItem, setIsFirstItem] = useAtom(isFirstItemAtom);
  const [uid, setUid] = useAtom(checklistUidAtom);
  const [checklistTitle] = useAtom(checklistTitleAtom);
  const [listUpdatedCounter, setListUpdatedCounter] = useAtom(
    listUpdatedCounterAtom
  );
  const [itemName, setItemName] = useState("");
  const [addItemIsError, setAddItemIsError] = useState(false);
  const router = useRouter();
  console.log(isFirstItem);

  /**
   * Used to make submit button spinning while saving new item
   */
  const [isAddingItem, setIsAddingItem] = useState(false);

  const addTaskInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleModalClose() {
    setItemName("");
    setAddItemIsError(false);
    onClose();
  }

  async function handleSaveItem() {
    // in case the item name is empty make form error
    if (itemName === "") {
      setAddItemIsError(true);
      if (addTaskInputRef.current) addTaskInputRef.current.focus();
      return;
    }

    setIsAddingItem(true);

    // use server state update only if it's not new checklist
    if (isFirstItem) {
      const newChecklistUid = await addFirstItemHandler(
        checklistTitle,
        itemName
      );
      router.push(`/${newChecklistUid}`);
    } else {
      if (uid) {
        await addItemHandler(itemName, uid);
        setListUpdatedCounter(listUpdatedCounter + 1);
      }
    }

    setIsAddingItem(false);
    setItemName("");
    onClose();
  }

  function handleSubmitAddNewTaskForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      {/* Floating button */}

      <AddFirstItemButton onClick={onOpen} hidden={!isFirstItem} />
      <Fade in={!isFirstItem}>
        <AddItemButton onClick={onOpen} aria-label="add new item" />
      </Fade>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalContent marginTop={"0"}>
          <form onSubmit={handleSubmitAddNewTaskForm} noValidate>
            <ModalBody>
              <FormControl isRequired isInvalid={addItemIsError}>
                <FormLabel>Add item</FormLabel>
                <Input
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  ref={addTaskInputRef}
                  autoComplete={"off"}
                />
                <FormErrorMessage>
                  {"Can't read your mind. Please name an item"}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction={"row"}>
                <Button onClick={handleModalClose} variant="ghost">
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveItem}
                  type="submit"
                  isLoading={isAddingItem}
                >
                  Add
                </Button>
              </Stack>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddItemModal;
