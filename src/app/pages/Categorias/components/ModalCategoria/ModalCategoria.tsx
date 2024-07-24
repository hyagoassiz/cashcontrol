import React, { useContext } from "react";
import { MuiModal } from "../../../../shared/components/MuiModal/MuiModal";
import { Box, Button, Grid, MenuItem, Switch, TextField, Typography } from "@mui/material";
import { ICategoria } from "../../interfaces";
import { Controller, useForm } from "react-hook-form";
import { usePersistirCategoria } from "./hooks/usePersistirCategoria";
import { GlobalContext } from "../../../../shared/contexts";
import { ListagemCategoriasContext } from "../../contexts";

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
  const { usuario } = useContext(GlobalContext);
  const { setReload } = useContext(ListagemCategoriasContext);

  const { handleSubmit, control } = useForm<ICategoria>({
    defaultValues: {
      id: data?.id || undefined,
      usuario: usuario.id,
      nome: data?.nome || "",
      tipo: data?.tipo || null,
      ativo: data?.ativo || true,
      incluirSoma: data?.incluirSoma
    },
  });

  const tipos = [{ value: "Entrada" }, { value: "Saída" }];

  const { handleCriarCategoria, handleEditarCategoria } =
    usePersistirCategoria();

  const onSubmit = async (data: ICategoria) => {
    if (!modeEditCategoria) {
      handleCriarCategoria(data);
    } else {
      handleEditarCategoria(data);
    }
    onClose();
    setReload((prevState) => !prevState);
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
      style={{ width: 600 }}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Controller
              name="nome"
              control={control}
              rules={{ required: true }}
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
          <Grid item xs={3}>
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
                    disabled={modeShowCategoria || false}
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
