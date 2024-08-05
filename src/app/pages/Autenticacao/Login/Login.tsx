import {
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useLogin } from "./hooks/useLogin";
import { ConfirmButton } from "../components/ConfirmButton/ConfirmButton";
import { PageContainer } from "../components/PageContainer/PageContainer";

export const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    handleNavigate,
    isPending,
    handleKeyDown,
  } = useLogin();

  return (
    <>
      <PageContainer titleRoute="Login" onKeyDown={handleKeyDown}>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            }}
            render={({ field, fieldState }) => (
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 50,
                }}
                required
                fullWidth
                disabled={isPending}
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                required
                error={!!fieldState.error}
                fullWidth
                disabled={isPending}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar de mim"
            disabled={isPending}
          />
        </Grid>

        <Grid item xs={12}>
          <ConfirmButton onClick={handleSubmit(onSubmit)} loading={isPending}>
            Entrar
          </ConfirmButton>
        </Grid>
        <Grid item>
          <Grid item xs>
            <Link
              onClick={handleNavigate}
              variant="body2"
              sx={{ cursor: "pointer" }}
            >
              Ainda não tem conta? Clique aqui
            </Link>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};
