import { useNavigate } from "react-router-dom";
import { LayoutLogin } from "../../shared/layouts/LayoutLogin";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { ILogin } from "./interfaces";
import { LoginService } from "./services/LoginService";

export const Login = () => {
  const navigate = useNavigate();
  const onSubmit = async  (data: ILogin) => {
    try {
      const result = await LoginService({ email: data.email, password: data.password });
      console.log("Resultado da autenticação:", result);
      navigate('/inicio', { replace: true });
      
      // Aqui você pode fazer algo com o resultado, como redirecionar o usuário para outra página
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      // Aqui você pode lidar com o erro, como exibir uma mensagem de erro para o usuário
    }
  };

  return (
    <LayoutLogin>
      <LoginForm onSubmit={onSubmit} />
    </LayoutLogin>
  );
};
