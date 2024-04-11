import { useTheme } from "@mui/material";
import { Container, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReactNode } from "react";

interface MuiFrameProps {
  title: string;
  children: ReactNode;
}

export const MuiFrame: React.FC<MuiFrameProps> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Container
      style={{
        height: "auto",
        width: "80%",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
        padding: 0,
        marginTop: theme.spacing(3),
      }}
    >
      <Box
        width="100%"
        height={45}
        bgcolor={"#1976D2"}
        alignItems="center"
        display="flex"
        marginBottom={theme.spacing(0.8)}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIosIcon sx={{ color: "white", cursor: "pointer", fontSize: theme.spacing(2.5) }} />
          <Typography variant="h6" color='white'>{title}</Typography>
        </Container>
      </Box>
      <Box sx={{padding: theme.spacing(1)}}>
        {children}
      </Box>
    </Container>
  );
};
