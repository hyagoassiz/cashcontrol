import * as PATHS from "../../../routes/paths";
import { IOptionsMenu } from "../../../shared/interfaces/IOptionsMenu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ClassIcon from "@mui/icons-material/Class";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import HomeIcon from "@mui/icons-material/Home";

export const ROTAS: IOptionsMenu[] = [
  {
    title: "",
    routes: [{ name: "Início", route: "#", icon: <HomeIcon /> }],
  },
  {
    title: "Movimentações",
    routes: [
      {
        name: "Transações",
        route: PATHS.TRANSACOES.LIST,
        icon: <SwapVertIcon />,
      },
      { name: "Saldos", route: PATHS.SALDOS.LIST, icon: <AttachMoneyIcon /> },
    ],
  },
  {
    title: "Sub Cadastros",
    routes: [
      { name: "Categorias", route: PATHS.CATEGORIAS.LIST, icon: <ClassIcon /> },
      {
        name: "Contas",
        route: PATHS.CONTAS.LIST,
        icon: <AccountBalanceIcon />,
      },
    ],
  },
];
