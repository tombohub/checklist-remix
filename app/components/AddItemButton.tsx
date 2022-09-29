import { AddIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import IconButtonBase from "./base/IconButtonBase";

export default function AddItemButton({ ...props }: IconButtonProps) {
  return (
    <>
      <IconButtonBase icon={<AddIcon />} colorScheme="yellow" {...props} />
    </>
  );
}
