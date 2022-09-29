import { IconButton, type IconButtonProps } from "@chakra-ui/react";

export default function IconButtonBase(props: IconButtonProps) {
  return (
    <>
      <IconButton size={"lg"} fontSize={"2xl"} {...props} />
    </>
  );
}
