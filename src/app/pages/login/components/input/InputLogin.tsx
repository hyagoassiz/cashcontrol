import { TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface IInputLoginProps {
  label: string;
  name: string;
  type: "email" | "password";
  variant: "outlined" | "filled" | "standard";
  formMethods: {
    register: UseFormRegister<ILoginFormData>; // Corrigindo o tipo de register
    errors: Record<string, string>;
  };
}

export const InputLogin: React.FC<IInputLoginProps> = ({ label, name, type, variant, formMethods }) => {
  const theme = useTheme();

  return (
    <TextField
      helperText={formMethods.errors[name] || " "}
      id={name}
      name={name}
      label={label}
      type={type}
      sx={{
        "& input": { width: "230px" },
      }}
      variant={variant}
      {...formMethods.register(name)} // Passando o nome diretamente para register
    />
  );
};
