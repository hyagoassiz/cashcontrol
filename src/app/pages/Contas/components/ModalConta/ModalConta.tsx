import React from "react";
import { MuiModal } from "../../../../shared/components/MuiModal/MuiModal";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IConta } from "../../interfaces";
import { ContaService } from "../../services/ContaService";

interface IModalContaProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  data: IConta | null;
  modeShowConta: boolean;
}

export const ModalConta: React.FC<IModalContaProps> = ({
  isOpen,
  onClose,
  data,
  modeShowConta,
  onEdit,
}) => {
  // const { handleModalConta, conta, modeShowConta, handleEditarConta } = useContext(
  //   ListagemContasContext
  // );


  const { handleSubmit, control } = useForm<IConta>({});

  const tipos = ["Conta Corrente", "Poupança", "Investimentos", "Outros"];

  const onSubmit = async (data: IConta) => {
    try {
      const response = await ContaService.criarConta(data);
      if (response.success) {
        console.log(response.message);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }

    console.log(data);
  };

  return (
    <MuiModal
      open={isOpen}
      title={modeShowConta ? "Conta" : "Criar Conta"}
      buttons={
        <>
          <Button onClick={onClose}>Fechar</Button>
          {modeShowConta ? (
            <Button variant="contained" onClick={onEdit}>
              Editar
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Salvar
            </Button>
          )}
        </>
      }
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={7.1}>
            <Controller
              name="nome"
              control={control}
              rules={{ required: false }}
              defaultValue={data?.nome || ""}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Nome"
                  type="text"
                  variant="standard"
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  value={field.value}
                  disabled={modeShowConta || false}
                  inputProps={{
                    maxLength: 30,
                  }}
                  error={!!error}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="tipoConta"
              control={control}
              rules={{ required: true }}
              defaultValue={data?.tipoConta || "Conta Corrente"}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  disablePortal
                  id="tipoConta"
                  options={tipos}
                  onChange={(event, value) => field.onChange(value)}
                  disabled={modeShowConta || false}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tipo da Conta"
                      error={!!error}
                      required
                    />
                  )}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={1}>
            <Controller
              name="agencia"
              control={control}
              rules={{ required: false }}
              defaultValue={data?.agencia || ""}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Agência"
                  name="agencia"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  disabled={modeShowConta || false}
                  inputProps={{
                    maxLength: 30,
                  }}
                  error={!!error}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="conta"
              control={control}
              rules={{ required: false }}
              defaultValue={data?.conta || ""}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Conta"
                  name="conta"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  disabled={modeShowConta || false}
                  inputProps={{
                    maxLength: 30,
                  }}
                  fullWidth
                  error={!!error}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="observacao"
              control={control}
              rules={{ required: false }}
              defaultValue={data?.observacao || ""}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Observação"
                  name="observacao"
                  type="text"
                  variant="standard"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  disabled={modeShowConta || false}
                  inputProps={{
                    maxLength: 30,
                  }}
                  error={!!error}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2">Incluir na soma</Typography>
              <Controller
                name="incluirSoma"
                control={control}
                defaultValue={data?.incluirSoma || true}
                render={({ field }) => (
                  <Switch
                    checked={field.value} // Define o valor do Switch com base no valor do campo
                    disabled={modeShowConta || false}
                    onChange={(e) => field.onChange(e.target.checked)} // Atualiza o valor do campo com base na alteração do Switch
                    size="small" // Define o tamanho do Switch
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
