import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import {
  BoxContainer,
  BoxFooter,
  BoxTitle,
  InsideColor,
  StyledModal,
} from "./styles/style";

interface IMuiModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  buttons?: ReactNode;
  style: BoxProps;
}

export const MuiModal: React.FC<IMuiModalProps> = ({
  title,
  open,
  children,
  buttons,
  style,
}) => {
  const theme = useTheme();
  return (
    <>
      {open && <BoxContainer onClick={(e) => e.stopPropagation()} />}
      <StyledModal open={open} keepMounted>
        <InsideColor
          sx={{
            ...style,
          }}
        >
          <BoxTitle>
            <Typography variant="h6" sx={{ marginLeft: "8px" }}>
              {title}
            </Typography>
          </BoxTitle>
          <Box sx={{ padding: theme.spacing(3) }}>{children}</Box>
          {buttons && <BoxFooter>{buttons}</BoxFooter>}
        </InsideColor>
      </StyledModal>
    </>
  );
};
