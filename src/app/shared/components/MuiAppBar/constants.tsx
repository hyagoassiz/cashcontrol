import { signOut } from "firebase/auth";
import { auth } from "../../../../FirebaseConnection";
import { ReactElement } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

interface IOptions {
  icon: ReactElement;
  name: string;
  route: string;
  function?: () => Promise<void>;
}

export const options: IOptions[] = [
  { icon: <SettingsIcon />, name: "Preferências", route: "#" },
  { icon: <PersonIcon />, name: "Minha Conta", route: "#" },
  {
    icon: <LogoutIcon />,
    name: "Sair",
    route: "#",
    function: async () => {
      await signOut(auth);
    },
  },
];
