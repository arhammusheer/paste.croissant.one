import { Box, Textarea } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { load, save } from "../redux/slices/paste.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export default function Content() {
  const location = window.location.pathname;
  const inputElement = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.paste.value);
  const [val, setVal] = useState(content);

  useMemo(() => {
    dispatch(load(location));
  }, [dispatch, location]);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  // When typing has ended for 1 second, save the content
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (val === content) return;
      if (val === "") return;
      dispatch(save({ content: val, key: location.slice(1) }));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [content, dispatch, location, val]);

  useEffect(() => {
    setVal(content);
  }, [content]);

  return (
    <Box p={4} h={"full"}>
      <Textarea
        value={val}
        ref={inputElement}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Type something..."
        h={"full"}
        border={0}
        autoFocus
      />
    </Box>
  );
}
