import { useRef, useState } from "react";
import AddFirstItemButton from "./AddFirstItemButton";
import {
  Button,
  Fade,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  checklistItemsAtom,
  checklistTitleAtom,
  listUpdatedCounterAtom,
} from "../data/store";
import {
  addFirstItemHandler,
  addItemHandler,
  deleteItemHandler,
} from "../data/eventHandlers";
import { AddIcon } from "@chakra-ui/icons";

interface AddItemModalProps {
  isFirstItem: boolean;
  uid?: string;
}

function AddItemModal({ isFirstItem, uid }: AddItemModalProps) {
  const [checklistItems, setCheklistItems] = useAtom(checklistItemsAtom);
  const [checklistTitle] = useAtom(checklistTitleAtom);
  const [listUpdatedCounter, setListUpdatedCounter] = useAtom(
    listUpdatedCounterAtom
  );
  const [itemName, setItemName] = useState("");
  const [addItemIsError, setAddItemIsError] = useState(false);
  const navigate = useNavigate();
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

      <AddFirstItemButton onClick={onOpen} hidden={!isFirstItem} />
      <Fade in={!isFirstItem}>
        <IconButton
          onClick={onOpen}
          aria-label="add item"
          icon={<AddIcon />}
          position={"fixed"}
          bottom={"4"}
          right={"4"}
          size={"lg"}
          colorScheme="yellow"
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
                  Can't read your mind. Please name an item
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
