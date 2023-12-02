import { Box } from "@chakra-ui/react";

import ChecklistTitle from "./ChecklistTitle";
import { type ReactNode } from "react";
import BottomButtonGroup from "./BottomButtonGroup";

interface LayoutProps {
  children?: ReactNode;
  isFirstItem: boolean;
  uid?: string | undefined;
}

function Layout({ children, isFirstItem, uid }: LayoutProps) {
  return (
    <>
      <Box padding={"2"} marginTop={"4"}>
        <ChecklistTitle uid={uid} isFirstItem={isFirstItem} />
      </Box>

      <Box padding={4}>{children}</Box>

      <Box position={"fixed"} bottom={0} width={"full"} padding={2}>
        <BottomButtonGroup isFirstItem={isFirstItem} />
      </Box>
    </>
  );
}

export default Layout;
