import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { ICadastro } from "../interfaces";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../../routes/paths";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../shared/redux/snackBar/actions";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IAutenticacao } from "../../interfaces";
import { auth } from "../../../../../FirebaseConnection";

interface IUseCadastro {
  control: Control<ICadastro>;
  handleNavigate: () => void;
  handleSubmit: UseFormHandleSubmit<ICadastro>;
  handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void;
  onSubmit(): void;
  isPending: boolean;
}

export const useCadastro = (): IUseCadastro => {
  const { control, handleSubmit, setError, getValues, reset } =
    useForm<ICadastro>();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      auth,
      email,
      password,
      displayName,
    }: IAutenticacao) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName });
      return userCredential;
    },
    onSuccess: () => {
      dispatch(showSnackbar("Conta criada com sucesso"));
      navigate(PATHS.AUTENTICACAO.CHECK);
    },
    onError: (error) => {
      dispatch(showSnackbar(`${error}`, "error"));
      reset();
    },
  });

  const onSubmit = () => {
    if (getValues("password") !== getValues("confirmPassword")) {
      setError("password", {
        type: "manual",
      });
      setError("confirmPassword", {
        type: "manual",
      });
      dispatch(showSnackbar("As senhas não são iguais", "error"));
    } else {
      handleSubmit(async (data) => {
        const payload: IAutenticacao = {
          auth: auth,
          displayName: data.displayName,
          email: data.email,
          password: data.password,
        };
        mutate(payload);
      })();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  const handleNavigate = () => {
    navigate(PATHS.AUTENTICACAO.LOGIN);
  };

  return {
    control,
    handleNavigate,
    handleSubmit,
    handleKeyDown,
    onSubmit,
    isPending,
  };
};
