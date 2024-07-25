import React from "react";
import { MuiModal } from "../../../../../shared/components/MuiModal/MuiModal";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useModalConta } from "./hooks/useModalConta";

export const ModalConta: React.FC = () => {
  const {
    control,
    tipos,
    onSubmit,
    toggleModalConta,
    handleModalConta,
    handleSubmit,
    conta,
  } = useModalConta();

  return (
    <MuiModal
      open={toggleModalConta}
      title={`${conta?.id ? "Editar" : "Nova"} Conta`}
      buttons={
        <>
          <Button onClick={handleModalConta}>Fechar</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </>
      }
      style={{ width: 600 }}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="nome"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Nome"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  value={field.value ?? ""}
                  inputProps={{
                    maxLength: 30,
                  }}
                  required
                  error={!!fieldState.error}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="tipoConta"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  disablePortal
                  id="tipoConta"
                  options={tipos}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  value={field.value ?? null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tipo da Conta"
                      error={!!fieldState.error}
                      required
                    />
                  )}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={3}>
            <Controller
              name="agencia"
              control={control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Agência"
                  name="agencia"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  value={field.value ?? ""}
                  inputProps={{
                    maxLength: 30,
                  }}
                  error={!!fieldState.error}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={3}>
            <Controller
              name="conta"
              control={control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Conta"
                  name="conta"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  value={field.value ?? ""}
                  inputProps={{
                    maxLength: 30,
                  }}
                  fullWidth
                  error={!!fieldState.error}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="observacao"
              control={control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Observação"
                  name="observacao"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  value={field.value ?? ""}
                  inputProps={{
                    maxLength: 30,
                  }}
                  error={!!fieldState.error}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2">Incluir na soma</Typography>
              <Controller
                name="incluirSoma"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value ?? true}
                    onChange={field.onChange}
                    size="small"
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </MuiModal>
  );
};
