import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useContext } from "react";
import { IUsuario } from "../../../../shared/interfaces";
import { GlobalContext } from "../../../../shared/contexts";

interface IUseVerificacao {
  handleNavigate: () => void;
  usuario: IUsuario | null;
}

export const useVerificacao = (): IUseVerificacao => {
  const { usuario } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    handleNavigate,
    usuario,
  };
};
