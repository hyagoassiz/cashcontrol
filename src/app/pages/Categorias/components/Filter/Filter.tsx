import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  useTheme,
} from "@mui/material";
import MuiDrawer from "../../../../shared/components/MuiDrawer/MuiDrawer";
import { useContext } from "react";
import { ListagemCategoriasContext } from "../../contexts";
import { Controller, useForm } from "react-hook-form";
import { IFilterData } from "../../interfaces";

const Filter = () => {
  const { isOpenFilter, setIsOpenFilter, setFilterData } =
    useContext(ListagemCategoriasContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFilterData>();

  const theme = useTheme();

  const onSubmit = (data: IFilterData) => {
    // const situacao: boolean[] = data.ativo
    //   ? data.ativo.map((option) => option === true)
    //   : [];

    setFilterData(data);

    setIsOpenFilter(false);
  };

  return (
    <>
      <MuiDrawer
        open={isOpenFilter}
        closeFilter={() => setIsOpenFilter(false)}
        applyFilter={handleSubmit(onSubmit)}
      >
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Controller
              name="tipo"
              control={control}
              defaultValue={["Entrada", "Saída"]}
              rules={{ required: "Este campo é obrigatório" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="tipo"
                  options={["Entrada", "Saída"]}
                  onChange={(event, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={{ width: "330px" }}
                      label="Tipo"
                      placeholder="Selecionar"
                      error={!!errors.tipo}
                      helperText={errors.tipo?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid paddingTop={theme.spacing(2)}>
            <Controller
              name="ativo"
              control={control}
              defaultValue={[true]}
              rules={{ required: "Este campo é obrigatório" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="ativo"
                  options={["Ativo", "Inativo"]}
                  onChange={(event, value) => {
                    const formattedValue = value.map((option) =>
                      option === "Ativo" ? true : false
                    );
                    field.onChange(formattedValue);
                  }}
                  value={field.value.map((option) =>
                    option ? "Ativo" : "Inativo"
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={{ width: "330px" }}
                      label="Situação"
                      placeholder="Selecionar"
                      error={!!errors.ativo}
                      helperText={errors.ativo?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </FormControl>
      </MuiDrawer>
    </>
  );
};

export default Filter;
