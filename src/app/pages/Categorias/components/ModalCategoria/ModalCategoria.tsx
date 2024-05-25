import React from "react";
import { MuiModal } from "../../../../shared/components/MuiModal/MuiModal";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ICategoria } from "../../interfaces";
import { Controller, useForm } from "react-hook-form";
import { CategoriaService } from "../../services/CategoriaService";

interface IModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  data: ICategoria | null;
  modeShowCategoria: boolean;
  modeEditCategoria: boolean;
}

export const ModalCategoria: React.FC<IModalCategoriaProps> = ({
  isOpen,
  onClose,
  onEdit,
  data,
  modeShowCategoria,
  modeEditCategoria,
}) => {
  const { handleSubmit, control } = useForm<ICategoria>({});

  const tipos = [{ value: "Entrada" }, { value: "Saída" }];

  const onSubmit = async (data: ICategoria) => {
    try {
      const response = await CategoriaService.criarCategoria(data);
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }

    onClose();
  };

  return (
    <MuiModal
      open={isOpen}
      title={
        modeShowCategoria || modeEditCategoria ? "Categoria" : "Nova Categoria"
      }
      buttons={
        <>
          <Button onClick={onClose}>Fechar</Button>
          <Button
            variant="contained"
            onClick={modeShowCategoria ? onEdit : handleSubmit(onSubmit)}
          >
            {modeShowCategoria ? "Editar" : "Salvar"}
          </Button>
        </>
      }
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Controller
              name="nome"
              control={control}
              rules={{ required: true }}
              defaultValue={data?.nome || ""}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Nome"
                  type="text"
                  variant="standard"
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  value={field.value}
                  disabled={modeShowCategoria || false}
                  inputProps={{
                    maxLength: 30,
                  }}
                  required
                  error={!!error}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              name="tipo"
              control={control}
              rules={{ required: true }}
              defaultValue={data?.tipo || null}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Tipo"
                  name="tipo"
                  type="text"
                  select
                  variant="standard"
                  required
                  disabled={modeShowCategoria || false}
                  inputProps={{
                    maxLength: 30,
                  }}
                  error={!!error}
                  fullWidth
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
        </Grid>
      </form>
    </MuiModal>
  );
};
