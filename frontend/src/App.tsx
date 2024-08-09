import { Stack } from "@chakra-ui/react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import SaveIndicator from "./components/SaveIndicator";

function App() {
  return (
    <Stack direction="column" spacing={4} h={"100vh"}>
      <Navbar />
      <Content />
      <SaveIndicator />
    </Stack>
  );
}

export default App;
