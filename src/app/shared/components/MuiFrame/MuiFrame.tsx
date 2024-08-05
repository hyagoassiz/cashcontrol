import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import {
  BoxContainer,
  StyledArrowBackIosIcon,
  StyledHomeIcon,
  StyledTypography,
} from "./styles/style";

interface MuiFrameProps {
  title?: string;
  handleBack?: () => void;
}

export const MuiFrame: React.FC<MuiFrameProps> = ({ title, handleBack }) => {
  const theme = useTheme();
  return (
    <>
      <BoxContainer>
        <>
          {handleBack ? (
            <>
              <Tooltip title="Voltar" placement="top">
                <IconButton onClick={handleBack}>
                  <StyledArrowBackIosIcon />
                </IconButton>
              </Tooltip>
              <StyledTypography variant="body1">Voltar</StyledTypography>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StyledHomeIcon />
              <StyledTypography variant="body2">
                Cash Control Project
              </StyledTypography>
            </Box>
          )}
        </>
        <Box sx={{ flexGrow: 1 }} />
      </BoxContainer>
      {title && (
        <>
          <Box
            sx={{
              padding: theme.spacing(1),
              marginTop: theme.spacing(2),
              marginLeft: theme.spacing(1),
              marginBottom: theme.spacing(2),
            }}
          >
            <StyledTypography variant="h5">{title}</StyledTypography>
          </Box>
        </>
      )}
    </>
  );
};
