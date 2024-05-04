import { Autocomplete, FormControl, TextField } from "@mui/material";
import MuiDrawer from "../../../../shared/components/MuiDrawer/MuiDrawer";
import { useContext } from "react";
import { FilterContext } from "../../contexts/filterContext";
import { Controller, useForm } from "react-hook-form";

interface IFormData {
  situacao: string[];
}

const Filter = () => {
  const { isOpenFilter, setIsOpenFilter, setSituacao } =
    useContext(FilterContext);

  const { control, handleSubmit, formState: { errors }} = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    const situacao: boolean[] = data.situacao.map(option => option === "Ativo");

    setSituacao(situacao);
    
    console.log(situacao);
    setIsOpenFilter(false);
  };

  return (
    <>
      <MuiDrawer open={isOpenFilter} closeFilter={() => setIsOpenFilter(false)} applyFilter={handleSubmit(onSubmit)}>
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="situacao"
            control={control}
            defaultValue={["Ativo"]}
            rules={{required: "Este campo é obrigatório"}}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                id="situacao"
                options={["Ativo", "Inativo"]}
                onChange={(event, value) => field.onChange(value)} // Atualiza o valor do campo situacao quando o usuário seleciona uma opção
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    sx={{ width: '330px' }}
                    label="Situação"
                    placeholder="Selecionar"
                    error={!!errors.situacao}
                    helperText={errors.situacao?.message}
                  />
                )}
              />
            )}
          />
        </FormControl>
      </MuiDrawer>
    </>
  );
};

export default Filter;
