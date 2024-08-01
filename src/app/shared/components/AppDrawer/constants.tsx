import { signOut } from "firebase/auth";
import * as PATHS from "../../../routes/paths";
import { IOptionsMenu } from "../../../shared/interfaces/IOptionsMenu";
import { auth } from "../../../../FirebaseConnection";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
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
        name: "Entradas e Saídas",
        route: PATHS.ENTRADAS_SAIDAS.LIST,
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
  {
    title: "Configurações",
    routes: [
      { name: "Preferências", route: "#", icon: <SettingsIcon /> },
      { name: "Minha Conta", route: "#", icon: <PersonIcon /> },
      {
        name: "Sair",
        route: "#",
        function: async () => {
          await signOut(auth);
        },
        icon: <LogoutIcon />,
      },
    ],
  },
];
