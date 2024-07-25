import * as PATHS from "../../../routes/paths";
import { IOptionsMenu } from "../../../shared/interfaces/IOptionsMenu";

export const OPTIONS: IOptionsMenu[] = [
  {
    title: "Movimentações",
    routes: [
      { name: "Entradas e Saídas", route: PATHS.ENTRADAS_SAIDAS.LIST },
      { name: "Saldos", route: PATHS.SALDOS.LIST },
    ],
  },
  {
    title: "Sub Cadastros",
    routes: [
      { name: "Categorias", route: PATHS.CATEGORIAS.LIST },
      { name: "Contas", route: PATHS.CONTAS.LIST },
    ],
  },
  {
    title: "Configurações",
    routes: [
      { name: "Preferências", route: "#" },
      { name: "Minha Conta", route: "#" },
    ],
  },
];
