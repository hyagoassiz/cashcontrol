import { Divider, IconButton, Tooltip, useTheme } from "@mui/material";
import { Container, Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeIcon from "@mui/icons-material/Home";

interface MuiFrameProps {
  title?: string;
  handleBack?: () => void;
}

export const MuiFrame: React.FC<MuiFrameProps> = ({ title, handleBack }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: theme.spacing(4),
          padding: theme.spacing(1),
          backgroundColor: "#1976D2",
        }}
      >
        <>
          {handleBack ? (
            <>
              <Tooltip title="Voltar" placement="top">
                <IconButton onClick={handleBack}>
                  <ArrowBackIosIcon
                    sx={{
                      cursor: "pointer",
                      fontSize: theme.spacing(2.3),
                      color: "white",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Typography variant="body1" sx={{ color: "white" }}>
                Voltar
              </Typography>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <HomeIcon
                sx={{
                  color: "white",
                  paddingRight: theme.spacing(0.5),
                  height: theme.spacing(2.5),
                }}
              />
              <Typography variant="body2" sx={{ color: "white" }}>
                Cash Control Project
              </Typography>
            </Box>
          )}
        </>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
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
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Divider sx={{ borderBottomWidth: theme.spacing(0.1) }} />
        </>
      )}
    </>
  );
};
