import { Box, ListItemText, Typography } from "@mui/material";
import MuiMoreVertIcon from "../../../../shared/components/MuiMoreVertIcon/MuiMoreVertIcon";
import { NumericFormat } from "react-number-format";
import { ISaldo } from "../../../../shared/interfaces";

interface IMountData {
  saldos: ISaldo[];
}

export function mountData({ saldos }: IMountData) {
  if (saldos?.length) {
    saldos.sort((a, b) => a.conta.localeCompare(b.conta));

    return saldos.map((saldo) => ({
      id: saldo.conta,
      conta: saldo.conta,
      entrada: (
        <ListItemText
          primary={
            <Typography variant="body2">
              <NumericFormat
                value={saldo.valores.pago.entradas}
                prefix={"R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Typography>
          }
          secondary={
            <Box>
              À receber:
              <NumericFormat
                value={saldo.valores.pendente.entradas}
                prefix={" R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Box>
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      saida: (
        <ListItemText
          primary={
            <Typography variant="body2">
              <NumericFormat
                value={saldo.valores.pago.saidas}
                prefix={"R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Typography>
          }
          secondary={
            <Box>
              À pagar:
              <NumericFormat
                value={saldo.valores.pendente.saidas}
                prefix={" R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Box>
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      saldo: (
        <ListItemText
          primary={
            <Typography variant="body2">
              <NumericFormat
                value={saldo.valores.pago.entradas - saldo.valores.pago.saidas}
                prefix={"R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Typography>
          }
          secondary={
            <Box>
              Previsto:
              <NumericFormat
                value={
                  saldo.valores.pago.entradas -
                  saldo.valores.pago.saidas +
                  (saldo.valores.pendente.entradas -
                    saldo.valores.pendente.saidas)
                }
                prefix={" R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Box>
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      options: (
        <MuiMoreVertIcon
          options={[
            {
              label: "Reajustar Saldo",
              action: () => console.log("clicou"),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
