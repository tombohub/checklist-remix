import { ButtonGroup, FlexProps, Spacer, Flex, Box } from "@chakra-ui/react";
import AddItemModal from "./AddItemModal";
import CopyLinkButton from "./CopyLinkButton";
import WhatsAppShareButton from "./WhatsAppShareButton";

interface BottomButtonGroupProps {
  isFirstItem: boolean;
}

export default function BottomButtonGroup(props: BottomButtonGroupProps) {
  return (
    <>
      <Flex minWidth={"max-content"}>
        <Box>
          <ButtonGroup>
            <WhatsAppShareButton />
            <CopyLinkButton />
          </ButtonGroup>
        </Box>
        <Spacer />
        <AddItemModal isFirstItem={props.isFirstItem} />
      </Flex>
    </>
  );
}
