import { Typography } from "@mui/material";
import { LayoutLogin } from "../../shared/layouts/LayoutLogin";
import { InputLogin } from "./components/input/InputLogin";
import { SubmitButton } from "./components/submit-button/SumitButton";
import { useTheme } from "@emotion/react";
import { useForm } from "react-hook-form";

interface ILoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginProps>();

  const onSubmit = (data: ILoginProps) => {
    console.log(data);
  };

  return (
    <LayoutLogin>
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.secondary.contrastText,
          fontWeight: "bolder",
          marginBottom: theme.spacing(5),
        }} // Adicionando espaço abaixo da tipografia
      >
        CashControl
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLogin
          label="E-mail"
          type="email"
          {...register("email", {
            required: "O e-mail é obrigatório",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "E-mail com formato inválido",
            },
          })}
          // error={!!errors.email} // Verificando o erro do campo de e-mail
        />
        <br/>


        <InputLogin
          label="Senha"
          type="password"
          {...register("password", {
            required: "A senha é obrigatória",
          })}
          // error={!!errors.password} // Verificando o erro do campo de senha
        />

        <SubmitButton>Entrar</SubmitButton>
      </form>
    </LayoutLogin>
  );
};
