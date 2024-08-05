import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface IUseAppBar {
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  navigate: NavigateFunction;
}

export const useAppBar = (): IUseAppBar => {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    navigate,
  };
};
