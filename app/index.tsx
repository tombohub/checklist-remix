import {
  ChakraProvider,
  extendTheme,
  Checkbox,
  Input,
  VStack,
  Stack,
  Box,
  Text,
  Divider,
  IconButton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useQuery } from "@tanstack/react-query";
import { getTodoList, addTask, updateTask } from "../data/api";
import { type Task } from "../data/DTOs";
import { useState, useRef, useEffect } from "react";

const theme = extendTheme({
  components: {
    Checkbox: {
      baseStyle: {
        icon: {
          color: "white",
        },
        control: {
          height: "24px", // works only when resetting defaultProps
          width: "24px",
          border: "1px",
          borderColor: "gray.300",
          _disabled: {
            borderColor: "gray.300",
            bg: "gray.200",
          },
        },
        label: {},
      },
      defaultProps: {
        // Reset props
        size: null,
        variant: null,
      },
    },
  },
});

function Main() {
  //   const [todoList, setTodoList] = useState<Task[]>([]);
  const [listUpdatedCounter, setListUpdatedCounter] = useState(0);
  const [todoListTitle, setTodoListTitle] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [addTaskIsError, setAddTaskIsError] = useState(false);

  const query = useQuery(["todoList"], getTodoList);

  const addTaskInputRef = useRef(null);
  const todoListTitleInputRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function todoListSorter(a: Task, b: Task) {
    return a.id - b.id;
  }

  function handleCheckboxChange(isSelected: boolean, taskId: number) {
    updateTask(taskId, isSelected);
    setListUpdatedCounter(listUpdatedCounter + 1);
  }

  function handleSaveTask() {
    if (newTaskName === "") {
      setAddTaskIsError(true);
      addTaskInputRef.current.focus();
      return;
    }

    addTask(newTaskName);
    setNewTaskName("");
    setListUpdatedCounter(listUpdatedCounter + 1);
    onClose();
  }

  function handleModalClose() {
    setNewTaskName("");
    setAddTaskIsError(false);
    onClose();
  }

  function handleSubmitAddNewTaskForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleSubmitTitle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    todoListTitleInputRef.current.blur();
  }

  // useEffect(() => {
  //     async function fetch() {
  //     const data = await getTodoList();
  //     data && setTodoList(data);
  //     }

  //     fetch().catch(err => console.error(err));
  // }, [listUpdatedCounter]);

  if (query.isLoading) return "Loading...";
  if (query.error) return "error: " + query.error;

  let todoList: Task[] | null = [];
  if (query.isSuccess) {
    todoList = query.data;
    console.log(todoList);
  }

  return (
    <>
      <ChakraProvider theme={theme}>
        <Box padding={"2"} marginTop={"4"}>
          <form onSubmit={handleSubmitTitle}>
            <Input
              fontSize={"3xl"}
              placeholder="Title..."
              variant={"flushed"}
              value={todoListTitle}
              onChange={e => setTodoListTitle(e.target.value)}
              ref={todoListTitleInputRef}
            />
            {/* <Button type="submit" /> */}
          </form>
        </Box>

        <Stack direction={"column"} padding={"4"} spacing={"4"}>
          {todoList &&
            todoList.sort(todoListSorter).map(task => (
              <>
                <Checkbox
                  key={task.id}
                  isChecked={task.is_completed}
                  onChange={e =>
                    handleCheckboxChange(e.target.checked, task.id)
                  }
                >
                  <Text
                    textDecorationLine={
                      task.is_completed ? "line-through" : "none"
                    }
                    fontSize={"xl"}
                  >
                    {task.task_name}
                  </Text>
                </Checkbox>
              </>
            ))}
        </Stack>

        {/* Floating button */}
        <IconButton
          onClick={onOpen}
          aria-label="add task"
          icon={<AddIcon />}
          position={"fixed"}
          bottom={"4"}
          right={"4"}
          size={"lg"}
          colorScheme="yellow"
        />

        {/* MODAL */}
        <Modal isOpen={isOpen} onClose={handleModalClose}>
          <ModalContent marginTop={"0"}>
            <form onSubmit={handleSubmitAddNewTaskForm} noValidate>
              <ModalBody>
                <FormControl isRequired isInvalid={addTaskIsError}>
                  <FormLabel>Add task</FormLabel>
                  <Input
                    value={newTaskName}
                    onChange={e => setNewTaskName(e.target.value)}
                    ref={addTaskInputRef}
                    autoComplete={"off"}
                  />
                  <FormErrorMessage>
                    Can't read your mind. Please name a task
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Stack direction={"row"}>
                  <Button onClick={handleSaveTask} type="submit">
                    Save
                  </Button>
                  <Button onClick={handleModalClose}>Cancel</Button>
                </Stack>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </ChakraProvider>

      <pre>
        new task name: {newTaskName}
        <h4>full list:</h4>
        {JSON.stringify(todoList, null, 2)}
        <h4>query data:</h4>
        {JSON.stringify(query.data, null, 2)}
      </pre>
    </>
  );
}

export default Main;
