import { Container, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const ContainerMenu: React.FC = () => {
  return (
    <Container
      style={{
        height: "500px",
        width: "80%",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
        padding: 0,
      }}
    >
      <Box
        width="100%"
        height={45}
        bgcolor={"#1976D2"}
        marginTop={3}
        marginBottom={1}
      >
        <Typography variant="body2">MENU</Typography>
      </Box>

      <Box
        width={200}
        height={50}
        boxShadow="0px 3px 5px rgba(0, 0, 0, 0.3)"
        borderRadius="4px"
        margin="10px"
        alignItems='center'
        display='flex'
      >
        <Box margin="2px" alignItems="center" justifyContent="center">
          <DashboardIcon style={{color: '#1976D2'}} />
        </Box>
      </Box>
    </Container>
  );
};
