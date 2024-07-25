import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";

interface IUseListagem {
  handleNavigate: () => void;
}

export const useListagem = (): IUseListagem => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
  };

  return {
    handleNavigate,
  };
};
