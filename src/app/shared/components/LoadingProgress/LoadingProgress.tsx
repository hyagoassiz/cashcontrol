import { Box, CircularProgress } from "@mui/material";
import { useLoadingProgress } from "./hooks/useLoadingProgress";

export const LoadingProgress: React.FC = () => {
  const { loading } = useLoadingProgress();

  return (
    <>
      {loading.open ? (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <CircularProgress size={60} color="secondary" />
        </Box>
      ) : null}
    </>
  );
};
