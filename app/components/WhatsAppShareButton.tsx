import { IconButton, Icon } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import IconButtonBase from "./base/IconButtonBase";

export default function WhatsAppShareButton() {
  return (
    <>
      <WhatsappShareButton title="here" separator=":" url="kok">
        <IconButtonBase
          icon={<FaWhatsapp />}
          aria-label="share with whatsapp"
          // span because otherwise would be button inside button which results in double icon in remix
          as={"span"}
        />
      </WhatsappShareButton>
    </>
  );
}
