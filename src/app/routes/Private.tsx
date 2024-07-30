import { useState, useEffect, ReactNode } from "react";
import { auth } from "../../FirebaseConnection";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserData } from "../shared/interfaces/IUserData";
import * as PATHS from "../routes/paths";
import { Box, CircularProgress } from "@mui/material";

interface IPrivate {
  children: ReactNode;
}

export default function Private({ children }: IPrivate) {
  const [signed, setSigned] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: IUserData = {
          uid: user.uid,
          email: user.email ?? "",
          emailVerified: user.emailVerified,
          displayName: user.displayName ?? null,
        };

        localStorage.setItem("@detailUser", JSON.stringify(userData));

        if (!user.emailVerified) {
          navigate(PATHS.AUTENTICACAO.CHECK);
        } else {
          if (location.pathname === PATHS.AUTENTICACAO.CHECK) {
            navigate(PATHS.MENU.LIST);
          }
        }

        setSigned(true);
      } else {
        localStorage.removeItem("@detailUser");
        setSigned(false);
        navigate(PATHS.AUTENTICACAO.LOGIN);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!loading && signed) {
      const userDataString = localStorage.getItem("@detailUser");
      if (userDataString) {
        const userData: IUserData = JSON.parse(userDataString);
        if (!userData.emailVerified) {
          sendEmailVerification(auth.currentUser!)
            .then(() => {
              console.log("E-mail de verificação enviado");
            })
            .catch((error) => {
              console.error("Erro ao enviar e-mail de verificação:", error);
            });
        }
      }
    }
  }, [loading, signed]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#1976D2",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return signed ? <>{children}</> : null;
}
