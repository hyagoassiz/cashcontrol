import React, { useContext } from "react";
import { MuiModal } from "../../../../shared/components/MuiModal/MuiModal";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { ICategoria } from "../../interfaces";
import { Controller, useForm } from "react-hook-form";
import { CategoriaService } from "../../services/CategoriaService";
// import { useListagemCategorias } from "../../hooks/useListagemCategorias";
import { ListagemCategoriasContext } from "../../contexts";

interface IModalCategoriaProps {
  isOpen: boolean;
}

export const ModalCategoria: React.FC<IModalCategoriaProps> = ({ isOpen }) => {
  const { setIsOpenAddModalCategoria } = useContext(ListagemCategoriasContext);
  
  const { handleSubmit, control } = useForm<ICategoria>({
    defaultValues: {
      usuario: "DxARypJQGMZeb1fMT4ft4BI4S2D2",
      nome: "",
      tipo: "Entrada",
      ativo: true
    },
  });

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

    setIsOpenAddModalCategoria(false);
  };

  return (
    <MuiModal
      open={isOpen}
      title="Criar Categoria"
      buttons={
        <>
          <Button onClick={() => setIsOpenAddModalCategoria(false)}>
            Fechar
          </Button>
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
                  width: "300px",
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
                  width: "130px",
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
