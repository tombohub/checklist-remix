import { Icon, IconButton } from "@chakra-ui/react";
import { FaRegCopy } from "react-icons/fa";
import IconButtonBase from "./base/IconButtonBase";

export default function CopyLinkButton() {
  return (
    <>
      <IconButtonBase icon={<FaRegCopy />} aria-label="copy url" />
    </>
  );
}
