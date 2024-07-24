import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { MuiModal } from "../../../../../shared/components/MuiModal/MuiModal";
import { useModalMovimentacoes } from "./hooks/useModalMovimentacoes";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export const ModalMovimentacoes: React.FC = () => {
  const {
    toggleModalMovimentacoes,
    handleModalMovimentacoes,
    control,
    isEntrada,
    categorias,
    contas,
    onSubmit,
    handleSubmit,
  } = useModalMovimentacoes();

  return (
    <MuiModal
      open={toggleModalMovimentacoes}
      title={`Registrar ${isEntrada ? "Entrada" : "Saída"}`}
      buttons={
        <>
          <Button variant="text" onClick={handleModalMovimentacoes}>
            Fechar
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Salvar
          </Button>
        </>
      }
      style={{ width: 700 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Controller
            name="data"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Data"
                type="date"
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
            name="categoria"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="categoria"
                options={categorias || []}
                getOptionLabel={(option) => option.nome || ""}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                value={categorias?.find((c) => c.id === field.value) || null}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={`${isEntrada ? "Origem" : "Motivo"}`}
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
            name="valor"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Valor"
                margin="none"
                variant="standard"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale={true}
                value={field.value ?? null}
                onChange={field.onChange}
                decimalSeparator=","
                thousandSeparator={"."}
                defaultValue={0}
                required
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="conta"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="conta"
                options={contas ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                value={contas?.find((c) => c.id === field.value) || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Conta"
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
            name="valor"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Saldo Atual"
                margin="none"
                variant="standard"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale={true}
                value={field.value ?? null}
                onChange={field.onChange}
                decimalSeparator=","
                thousandSeparator={"."}
                defaultValue={0}
                error={!!fieldState.error}
                disabled
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="valor"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Novo Saldo"
                margin="none"
                variant="standard"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale={true}
                value={field.value ?? null}
                onChange={field.onChange}
                decimalSeparator=","
                thousandSeparator={"."}
                defaultValue={0}
                error={!!fieldState.error}
                disabled
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
            <Typography variant="body2">{`${
              isEntrada ? "Recebido" : "Pago"
            }`}</Typography>
            <Controller
              name="pago"
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
    </MuiModal>
  );
};
