import { Autocomplete, FormControl, Grid, TextField } from "@mui/material";
import MuiDrawer from "../../../../../shared/components/MuiDrawer/MuiDrawer";
import { Controller } from "react-hook-form";
import { useFilter } from "./hooks/useFilter";

const Filter = () => {
  const { toggleFilter, setToggleFilter, control, handleSubmit, onSubmit } =
    useFilter();

  return (
    <>
      <MuiDrawer
        open={toggleFilter}
        closeFilter={() => setToggleFilter(false)}
        applyFilter={handleSubmit(onSubmit)}
      >
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Controller
              name="tipoConta"
              control={control}
              defaultValue={[
                "Conta Corrente",
                "Poupança",
                "Investimentos",
                "Outros",
              ]}
              rules={{ required: "Este campo é obrigatório" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="tipoConta"
                  options={[
                    "Conta Corrente",
                    "Poupança",
                    "Investimentos",
                    "Outros",
                  ]}
                  onChange={(_, value) => field.onChange(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      sx={{ width: "330px" }}
                      label="Tipo da Conta"
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
                  onChange={(_, value) => {
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
