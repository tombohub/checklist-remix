import { ButtonGroup, FlexProps, Spacer, Flex, Box } from "@chakra-ui/react";
import AddItemModal from "./AddItemModal";
import CopyLinkButton from "./CopyLinkButton";
import WhatsAppShareButton from "./WhatsAppShareButton";

export default function BottomButtonGroup(props: FlexProps) {
  return (
    <>
      <Flex minWidth={"max-content"} {...props}>
        <Box>
          <ButtonGroup>
            <WhatsAppShareButton />
            <CopyLinkButton />
          </ButtonGroup>
        </Box>
        <Spacer />
        <AddItemModal />
      </Flex>
    </>
  );
}
