import { TextField } from "@mui/material";
import { useTheme } from "@mui/material";

interface IInputLoginProps {
  label: string;
  type: "email" | "password";
  // error: boolean;
}

export const InputLogin: React.FC<IInputLoginProps> = ({ label, type }) => {
  const theme = useTheme();

  return (
    <>
      <TextField
        helperText=" "
        id="email"
        label={label}
        type={type}
        rows="10"
        sx={{
          "& input": {width: "230px", color: theme.palette.secondary.contrastText }, // Alterando a cor do texto
          "& label": { color: theme.palette.primary.contrastText }, // Alterando a cor do label
          "& label.Mui-focused": {
            color: theme.palette.primary.contrastText, // Cor do rótulo quando em foco (pode ajustar para uma cor que contraste bem com o fundo)
          },
        }}
        variant="filled"
        // error={error}
      />
    </>
  );
};
