import { Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Stack direction="column" spacing={4}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/:id" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default App;
