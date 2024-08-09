import { Text } from "@chakra-ui/react";
import { useAppSelector } from "../redux/store";

export default function Content() {
  const content = useAppSelector((state) => state.paste.value);
  return <Text>{content}</Text>;
}
