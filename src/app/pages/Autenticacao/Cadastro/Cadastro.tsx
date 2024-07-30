import { Grid, Link, TextField } from "@mui/material";
import { ConfirmButton } from "../components/ConfirmButton/ConfirmButton";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";

export const Cadastro: React.FC = () => {
  const {
    control,
    handleNavigate,
    onSubmit,
    handleSubmit,
    handleKeyDown,
    isPending,
  } = useCadastro();

  return (
    <PageContainer titleRoute="Criar Conta" onKeyDown={handleKeyDown}>
      <Grid item xs={12}>
        <Controller
          name="displayName"
          control={control}
          rules={{
            required: true,
            minLength: 2,
          }}
          render={({ field, fieldState }) => (
            <TextField
              label="Nome"
              type="text"
              variant="outlined"
              onChange={(e) => {
                field.onChange(e);
              }}
              onBlur={() => {
                const cleanedValue = field.value.trim().replace(/\s+/g, " ");
                field.onChange({
                  target: { name: field.name, value: cleanedValue },
                });
              }}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 40,
              }}
              required
              disabled={isPending}
              fullWidth
              error={!!fieldState.error}
            />
          )}
        />
      </Grid>
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
              disabled={isPending}
              fullWidth
              error={!!fieldState.error}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field, fieldState }) => (
            <TextField
              label="Senha (mínimo: 6, máximo: 30)"
              type="password"
              variant="outlined"
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s+/g, "");
                field.onChange({
                  target: { name: field.name, value: cleanedValue },
                });
              }}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 30,
              }}
              required
              disabled={isPending}
              error={!!fieldState.error}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field, fieldState }) => (
            <TextField
              label="Repetir Senha"
              type="password"
              variant="outlined"
              onChange={(e) => {
                const cleanedValue = e.target.value.replace(/\s+/g, "");
                field.onChange({
                  target: { name: field.name, value: cleanedValue },
                });
              }}
              value={field.value ?? ""}
              inputProps={{
                maxLength: 30,
              }}
              required
              disabled={isPending}
              error={!!fieldState.error}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <ConfirmButton onClick={handleSubmit(onSubmit)} loading={isPending}>
          CRIAR CONTA
        </ConfirmButton>
      </Grid>
      <Grid item>
        <Grid item xs>
          <Link
            onClick={handleNavigate}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Já tem conta? Clique aqui
          </Link>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
