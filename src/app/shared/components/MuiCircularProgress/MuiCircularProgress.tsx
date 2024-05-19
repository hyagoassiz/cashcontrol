import { Box, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { ProgressContext } from "../../contexts/ProgressContext";

export const MuiCircularProgress: React.FC = () => {
  const { loading } = useContext(ProgressContext);
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" size="70px" />
        </Box>
      )}
    </>
  );
};
