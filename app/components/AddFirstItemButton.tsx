import { AddIcon } from "@chakra-ui/icons";
import { Button, type ButtonProps } from "@chakra-ui/react";

export default function AddFirstItemButton({ ...rest }: ButtonProps) {
  return (
    <>
      <Button
        aria-label="add item"
        rightIcon={<AddIcon />}
        position={"fixed"}
        bottom={4}
        right={4}
        size={"lg"}
        colorScheme={"yellow"}
        {...rest}
      >
        Add Item
      </Button>
    </>
  );
}
