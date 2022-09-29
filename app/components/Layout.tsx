import { Stack, Box, Button } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import ChecklistTitle from "./ChecklistTitle";
import { ReactNode } from "react";
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

      <BottomButtonGroup />
    </>
  );
}

export default Layout;
