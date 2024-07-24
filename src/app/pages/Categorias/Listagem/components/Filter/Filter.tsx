import { Autocomplete, FormControl, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFilter } from "./hooks/useFilter";
import MuiDrawer from "../../../../../shared/components/MuiDrawer/MuiDrawer";

const Filter = () => {
  const { toggleFilter, handleToggleFilter, handleSubmit, onSubmit, control } =
    useFilter();

  return (
    <>
      <MuiDrawer
        open={toggleFilter}
        closeFilter={handleToggleFilter}
        applyFilter={handleSubmit(onSubmit)}
      >
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Controller
              name="tipo"
              control={control}
              defaultValue={["Entrada", "Saída"]}
              rules={{ required: "Este campo é obrigatório" }}
              render={({ field, fieldState }) => (
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
                      error={!!fieldState.error}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid paddingTop={2}>
            <Controller
              name="ativo"
              control={control}
              defaultValue={[true]}
              rules={{ required: "Este campo é obrigatório" }}
              render={({ field, fieldState }) => (
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
                      error={!!fieldState.error}
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
