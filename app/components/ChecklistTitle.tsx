import { Button, Input } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRef } from "react";
import { changeChecklistTitleHandler } from "../data/eventHandlers";
import { checklistTitleAtom } from "../data/store";

interface ChecklistTitleProps {
  uid: string | undefined;
  title: string | null;
}

function ChecklistTitle({ uid, title }: ChecklistTitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleOnBlur() {
    if (title && uid) {
      await changeChecklistTitleHandler(title, uid);
    } else if (!title && uid) {
      await changeChecklistTitleHandler(null, uid);
    } else {
      console.log("no title change");
    }
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) inputRef.current.blur();
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} noValidate>
        <Input
          placeholder="Title..."
          variant={"flushed"}
          fontSize={"3xl"}
          value={title ? title : ""}
          ref={inputRef}
          onBlur={handleOnBlur}
        />
      </form>
    </>
  );
}

export default ChecklistTitle;
