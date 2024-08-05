import { useState, useEffect, ReactNode } from "react";
import { auth } from "../../FirebaseConnection";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATHS from "../routes/paths";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarUserData,
  removerUserData,
} from "../shared/redux/user/actions";
import { RootState } from "../shared/redux/interfaces/IRedux";
import { IUsuario } from "../shared/interfaces";

interface IPrivate {
  children: ReactNode;
}

export default function Private({ children }: IPrivate) {
  const [signed, setSigned] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userReducer = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: IUsuario = {
          uid: user.uid,
          email: user.email ?? "",
          emailVerified: user.emailVerified,
          displayName: user.displayName ?? null,
        };

        dispatch(adicionarUserData(userData));

        if (!user.emailVerified) {
          navigate(PATHS.AUTENTICACAO.CHECK);
        } else {
          if (location.pathname === PATHS.AUTENTICACAO.CHECK) {
            navigate(PATHS.MENU.LIST);
          }
        }

        setSigned(true);
      } else {
        dispatch(removerUserData());
        setSigned(false);
        navigate(PATHS.AUTENTICACAO.LOGIN);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [navigate, location.pathname, dispatch]);

  useEffect(() => {
    if (!loading && signed) {
      if (!userReducer.emailVerified) {
        sendEmailVerification(auth.currentUser!)
          .then(() => {
            console.log("E-mail de verificação enviado");
          })
          .catch((error) => {
            console.error("Erro ao enviar e-mail de verificação:", error);
          });
      }
    }
  }, [loading, signed, userReducer]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "white",
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
