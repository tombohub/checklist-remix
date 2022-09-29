import { IconButton } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import IconButtonBase from "./base/IconButtonBase";

export default function WhatsAppShareButton() {
  return (
    <>
      <WhatsappShareButton title="Title here" separator="ks" url="kok">
        <IconButtonBase
          icon={<FaWhatsapp />}
          aria-label="share with whatsapp"
        />
      </WhatsappShareButton>
    </>
  );
}
