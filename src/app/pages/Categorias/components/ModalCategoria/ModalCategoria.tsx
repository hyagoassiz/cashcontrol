import React from "react";
import { MuiModal } from "../../../../shared/components/MuiModal/MuiModal";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ICategoria } from "../../interfaces";
import { Controller, useForm } from "react-hook-form";

interface IModalCategoriaProps {
  isOpen: boolean;
  handleModal: () => void;
  onSubmit: (data: ICategoria) => void;
}

export const ModalCategoria: React.FC<IModalCategoriaProps> = ({
  isOpen,
  handleModal,
  onSubmit,
}) => {
  const { handleSubmit, control } = useForm<ICategoria>();

  const tipos = [{ value: "Entrada" }, { value: "Saída" }];

  return (
    <MuiModal
      open={isOpen}
      title="Criar Categoria"
      buttons={
        <>
          <Button onClick={handleModal}>Fechar</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </>
      }
    >
      <form>
        <Grid sx={{ display: "flex" }}>
          <Controller
            name="nome"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
              {...field}
                label="Nome"
                name="nome"
                type="text"
                variant="standard"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                required
                style={{
                  width: "250px",
                }}
                inputProps={{
                  maxLength: 30,
                }}
                error={!!error}
              />
            )}
          />

          <Controller
            name="tipo"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Tipo"
                name="tipo"
                type="text"
                select
                variant="standard"
                required
                style={{
                  width: "100px",
                  marginLeft: "15px",
                }}
                inputProps={{
                  maxLength: 30,
                }}
                error={!!error}
              >
                {tipos.map((tipo) => (
                  <MenuItem key={tipo.value} value={tipo.value}>
                    {tipo.value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </form>
    </MuiModal>
  );
};
