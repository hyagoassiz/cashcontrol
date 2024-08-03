import { useState, useEffect, ReactNode } from "react";
import { auth } from "../../FirebaseConnection";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import * as PATHS from "../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import {
  adicionarUserData,
  removerUserData,
} from "../shared/redux/user/actions";
import { RootState } from "../shared/redux/interfaces/IRedux";
import { IUsuario } from "../shared/interfaces";
import { setLoading } from "../shared/redux/loading/actions";

interface IPrivate {
  children: ReactNode;
}

export default function Private({ children }: IPrivate) {
  const [signed, setSigned] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userReducer = useSelector((state: RootState) => state.user);
  const loadingReducer = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch(setLoading(true));
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
            navigate(PATHS.TRANSACOES.LIST);
          }
        }

        setSigned(true);
      } else {
        dispatch(removerUserData());
        setSigned(false);
        navigate(PATHS.AUTENTICACAO.LOGIN);
      }
      dispatch(setLoading(false));
    });

    return () => unsub();
  }, [navigate, location.pathname, dispatch]);

  useEffect(() => {
    if (!loadingReducer.open && signed) {
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
  }, [loadingReducer, signed, userReducer]);

  return signed ? <>{children}</> : null;
}
