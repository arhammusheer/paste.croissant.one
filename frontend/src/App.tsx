import { Stack } from "@chakra-ui/react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Stack direction="column" spacing={4}>
      <Navbar />
      <Content />
    </Stack>
  );
}

export default App;
