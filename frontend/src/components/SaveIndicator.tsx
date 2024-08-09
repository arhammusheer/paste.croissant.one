import { Box, Icon, Spinner } from "@chakra-ui/react";
import { useAppSelector } from "../redux/store";
import { FaCheck } from "react-icons/fa";

export default function SaveIndicator() {
  const loading = useAppSelector((state) => state.paste.loading);

  return (
    <Box position="fixed" bottom={4} right={4} p={2} rounded="md">
      {loading ? <Saving /> : <Saved />}
    </Box>
  );
}

const Saved = () => <Icon as={FaCheck} color="green.500" />;
const Saving = () => <Spinner size="sm" color="gray.500" />;
