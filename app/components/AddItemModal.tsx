import { useRef, useState } from "react";
import AddFirstItemButton from "./AddFirstItemButton";
import { useNavigate, useLoaderData } from "@remix-run/react";
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

interface AddItemModalProps {
  isFirstItem: boolean;
}

function AddItemModal(props: AddItemModalProps) {
  const data = useLoaderData();
  const [uid, setUid] = useAtom(checklistUidAtom);
  const [checklistTitle] = useAtom(checklistTitleAtom);
  const [listUpdatedCounter, setListUpdatedCounter] = useAtom(
    listUpdatedCounterAtom
  );
  const [itemName, setItemName] = useState("");
  const [addItemIsError, setAddItemIsError] = useState(false);
  const navigate = useNavigate();

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
    if (props.isFirstItem) {
      const newChecklistUid = await addFirstItemHandler(
        checklistTitle,
        itemName
      );
      navigate(`/${newChecklistUid}`);
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

      <AddFirstItemButton onClick={onOpen} hidden={!props.isFirstItem} />
      <Fade in={!props.isFirstItem}>
        <AddItemButton
          onClick={onOpen}
          aria-label="add new item"
          hidden={props.isFirstItem}
        />
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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default AddItemModal;
