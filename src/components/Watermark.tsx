import { Text } from "@mantine/core";
import "../styles/Watermark.css";

export default function Watermark() {
  return (
    <Text className={"watermark"} size={"sm"} fw={"bolder"}>
      {author}
    </Text>
  );
}

const author = import.meta.env.VITE_APP_AUTHOR;
