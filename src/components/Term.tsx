import { Text, Tooltip } from "@mantine/core";
import { ReactNode } from "react";

import "../styles/Term.css";

export interface TermProps {
  children: ReactNode;
  label: string;
}

export default function Term({ children, label }: TermProps) {
  return (
    <Tooltip label={label} inline withArrow zIndex={1000}>
      <Text span className={"term"}>
        {children}
      </Text>
    </Tooltip>
  );
}
