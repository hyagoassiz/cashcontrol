import { Alert } from "@mui/material";



export const TextAlert: React.FC = () => {
    return(
        <>
        <Alert severity="error">Usuário ou senha errada</Alert>
        </>
    );

}