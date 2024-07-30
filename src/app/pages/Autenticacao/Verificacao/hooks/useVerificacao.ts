import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { IUserData } from "../../../../shared/interfaces/IUserData";
import { useEffect, useState } from "react";

interface IUseVerificacao {
  handleNavigate: () => void;
  userData: IUserData | null;
}

export const useVerificacao = (): IUseVerificacao => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("@detailUser");
    if (userDataString) {
      const parsedUserData: IUserData = JSON.parse(userDataString);
      setUserData(parsedUserData);
    } else {
      setUserData(null);
    }
  }, []);

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    handleNavigate,
    userData,
  };
};
