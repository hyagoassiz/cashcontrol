import { FormGroup, Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ILogin } from "../../interfaces";
import { SubmitButton } from "../SubmitButton/SubmitButton";

interface ILoginProps {
  onSubmit: (data: ILogin) => void;
}

export const LoginForm: React.FC<ILoginProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const { handleSubmit, control } = useForm<ILogin>();

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bolder",
          marginBottom: theme.spacing(5),
        }}
      >
        CashControl
      </Typography>

      <FormGroup>
        <Grid
        //   container
        //   columnSpacing={4}
        //   paddingX={1}
          paddingY={1}
        //   display="flex"
        //   alignItems="end"
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                required
                error={!!error}
              />
            )}
          />
        </Grid>

        <Grid
        //   container
        //   columnSpacing={4}
        //   paddingX={1}
          paddingY={1}
        //   display="flex"
        //   alignItems="end"
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Senha"
                type="password"
                required
                error={!!error}
              />
            )}
          />
        </Grid>
        <SubmitButton buttonType="submit" onSubmit={handleSubmit(onSubmit)}>
          Entrar
        </SubmitButton>
      </FormGroup>
    </>
  );
};
