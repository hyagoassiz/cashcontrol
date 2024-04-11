import { useNavigate } from "react-router-dom";
import { LayoutLogin } from "../../shared/layouts/LayoutLogin";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { ILogin } from "./interfaces";
import { LoginService } from "./services/LoginService";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import * as PATHS from '../../routes/paths';

export const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (data: ILogin) => {
    try {
      setIsLoading(true);
      const result = await LoginService({
        email: data.email,
        password: data.password,
      });
      setIsLoading(false);
      if (result.status === 200) {
        navigate(PATHS.DASHBOARD.LIST, { replace: true });
      } else {
        setError(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao autenticar:", error);
    }
  };

  return (
    <LayoutLogin>
      {isLoading ? (
        <CircularProgress
          style={{ backgroundColor: "transparent" }}
          size={50}
        />
      ) : (
        <LoginForm onSubmit={onSubmit} erroLogin={error} />
      )}
    </LayoutLogin>
  );
};
