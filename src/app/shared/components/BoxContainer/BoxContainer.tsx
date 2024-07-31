import { ReactNode } from "react";
import { StyledContainer } from "./styles/style";

interface IBoxContainer {
  children: ReactNode;
}

export const BoxContainer: React.FC<IBoxContainer> = ({ children }) => {
  return <StyledContainer disableGutters>{children}</StyledContainer>;
};
