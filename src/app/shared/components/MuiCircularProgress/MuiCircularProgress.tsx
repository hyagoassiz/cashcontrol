import { Box, CircularProgress } from "@mui/material";

export const MuiCircularProgress: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color="primary" size='70px'/>
        </Box>
    );
}
