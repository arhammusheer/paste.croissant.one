import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useAppSelector } from "../redux/store";
import Logo from "./Logo";

export default function Navbar() {
  const path = useAppSelector((state) => state.paste.key);

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
        {path}
      </Text>
    </Stack>
  );
}
