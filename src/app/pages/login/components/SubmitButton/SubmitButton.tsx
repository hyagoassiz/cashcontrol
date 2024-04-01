import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface ISubmitButtonProps {
  children: React.ReactNode;
  buttonType: "button" | "submit" | "reset"; 
  onSubmit?: () => void;
}

export const SubmitButton: React.FC<ISubmitButtonProps> = ({ children, buttonType, onSubmit, ...other }) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onSubmit) {
      onSubmit(); 
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        size="large"
        style={{
          width: "223px",
          height: "50px",
          fontWeight: "bolder",
          marginTop: theme.spacing(2),
        }}
        onClick={handleClick}
        type={buttonType}
        {...other}
      >
        {children}
      </Button>
    </div>
  );
};
