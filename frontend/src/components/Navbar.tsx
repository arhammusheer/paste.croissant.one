import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Logo from "./Logo";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
	const pathName = location.pathname;
  
  return (
    <Stack
      direction="row"
      spacing={4}
      p={4}
      align="center"
      justify="space-between"
    >
      <Logo />
      <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
        {pathName}
      </Text>
    </Stack>
  );
}
