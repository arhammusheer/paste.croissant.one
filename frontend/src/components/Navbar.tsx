import { Stack, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useAppSelector } from "../redux/store";
import Logo from "./Logo";
import { motion } from "framer-motion";

export default function Navbar() {
  const path = useAppSelector((state) => state.paste.key);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://paste.croissant.one/${path}`);
  };

  return (
    <Stack
      direction="row"
      spacing={4}
      p={4}
      align="center"
      justify="space-between"
    >
      <Logo />
      <Tooltip label="Copy to clipboard" aria-label="Copy to clipboard">
        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.300")}
          _hover={{ color: useColorModeValue("blue.600", "blue.100") }}
          as={motion.p}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          cursor="pointer"
          onClick={copyToClipboard}
        >
          /{path}
        </Text>
      </Tooltip>
    </Stack>
  );
}
