import { Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useMemo } from "react";
import { load } from "../redux/slices/paste.slice";

export default function Content() {
  const location = window.location.pathname;

  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.paste.value);

  useMemo(() => {
    dispatch(load(location));
  }, [dispatch]);

  return <Text>{content}</Text>;
}
