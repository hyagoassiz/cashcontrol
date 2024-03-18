import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";


interface ISubmitButton {
  children: React.ReactNode;
  onClick?: () => void; // Adicionando a função onSubmit como prop
}

export const SubmitButton: React.FC<ISubmitButton> = ({ children, onClick  }) => {
  const theme = useTheme();



  return (
    <div>
      <Button
        variant="contained"
        size="large"
        style={{
          width: "250px",
          height: "50px",
          backgroundColor: theme.palette.secondary.contrastText,
          color: 'black',
          fontWeight:"bolder",
          marginTop: theme.spacing(2),

        }}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};
