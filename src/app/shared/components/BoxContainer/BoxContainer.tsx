import { Container } from "@mui/material";
import { ReactNode } from "react";

interface IBoxContainer {
  children: ReactNode;
}

export const BoxContainer: React.FC<IBoxContainer> = ({ children }) => {
  return (
    <Container
      disableGutters
      sx={{
        height: "auto",
        width: "1000px",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
        marginTop: "16px",
        marginBottom: "32px",
      }}
    >
      {children}
    </Container>
  );
};
