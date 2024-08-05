import { Grid } from "@mui/material";
import { ConfirmButton } from "../components/ConfirmButton/ConfirmButton";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";
import { StyledDivider, StyledLink, StyledTextField } from "../styles/style";

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
            <StyledTextField
              label="Nome"
              type="text"
              variant="outlined"
              color="secondary"
              onChange={field.onChange}
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
            <StyledTextField
              label="Email"
              type="email"
              variant="outlined"
              color="secondary"
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
            <StyledTextField
              label="Senha (min: 6, max: 30)"
              type="password"
              variant="outlined"
              color="secondary"
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
            <StyledTextField
              label="Repetir Senha"
              type="password"
              variant="outlined"
              color="secondary"
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
      <Grid item xs={12}>
        <StyledDivider />
      </Grid>
      <Grid item>
        <Grid item xs>
          <StyledLink
            onClick={handleNavigate}
            variant="body2"
            sx={{ cursor: "pointer" }}
          >
            Já possui conta? Clique aqui
          </StyledLink>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
