import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../FirebaseConnection";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";
import { IAutenticacao } from "../../interfaces";

interface IUseLogin {
  control: Control<IAutenticacao>;
  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<IAutenticacao>;
  handleNavigate: () => void;
  isPending: boolean;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
}

export const useLogin = (): IUseLogin => {
  const { control, handleSubmit, reset } = useForm<IAutenticacao>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ auth, email, password }: IAutenticacao) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => navigate(PATHS.ENTRADAS_SAIDAS.LIST),
    onError: (error) => {
      dispatch(showSnackbar(`${error}`, "error"));
      reset();
    },
  });

  const onSubmit = () => {
    handleSubmit((data) => {
      const payload: IAutenticacao = {
        auth: auth,
        email: data.email,
        password: data.password,
      };
      mutate(payload);
    })();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.CREATE);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    handleNavigate,
    isPending,
    handleKeyDown,
  };
};
