import React from "react";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useModalCategoria } from "./hooks/useModalCategoria";
import { MuiModal } from "../../../../../shared/components/MuiModal/MuiModal";

export const ModalCategoria: React.FC = () => {
  const {
    toggleModalCategoria,
    handleModalCategoria,
    handleSubmit,
    control,
    onSubmit,
    tipos,
    getValues,
  } = useModalCategoria();

  return (
    <MuiModal
      open={toggleModalCategoria}
      title={`${getValues("id") ? "Editar" : "Criar"} Categoria`}
      buttons={
        <>
          <Button color="secondary" onClick={handleModalCategoria}>
            Fechar
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </Button>
        </>
      }
      style={{ width: 600 }}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Controller
              name="nome"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  label="Nome"
                  type="text"
                  color="secondary"
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
          <Grid item xs={3}>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  disablePortal
                  id="tipo"
                  color="secondary"
                  options={tipos || []}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  value={field.value ?? null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      color="secondary"
                      variant="standard"
                      label="Tipo"
                      error={!!fieldState.error}
                      required
                    />
                  )}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
      </form>
    </MuiModal>
  );
};
