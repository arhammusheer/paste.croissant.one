import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect } from "react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import SaveIndicator from "./components/SaveIndicator";

function App() {
  return (
    <Stack direction="column" spacing={4} h={"100vh"}>
      <Navbar />
      <Content />
      <SaveIndicator />
      <FirstTime />
    </Stack>
  );
}

const FirstTime = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Check if this is the first time the user is visiting the site
  // If it is, show the modal
  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      onOpen();
      localStorage.setItem("visited", "true");
    }
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hey There!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8}>
            {messages.map((message, index) => (
              <Stack key={index} spacing={2} direction="row" align="center">
                <Avatar name={(index + 1).toString()} bg="blue.400" />
                <Text>{message}</Text>
              </Stack>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Got it!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const messages = [
  "Open paste.croissant.one in your browser",
  "Type something in the text area. (It will be saved automatically)",
  "Click on the text on top right to copy the link",
  "Share the link anywhere you want!",
];

export default App;
