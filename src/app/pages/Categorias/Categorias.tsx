import { Container } from "@mui/material";
import MuiAddButton from "../../shared/components/MuiAddButton/MuiAddButton";
import { MuiAppBar } from "../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../shared/components/MuiFrame/MuiFrame";
import { useState } from "react";
import { ModalCategoria } from "./components/ModalCategoria/ModalCategoria";
import { ICategoria } from "./interfaces";

export const Categorias: React.FC = () => {

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onSubmit = async (data: ICategoria) => {
    console.log(data)
    setIsOpenModal(false)
  }

  return (
    <>
      <MuiAppBar />
      <Container>
        <MuiFrame title="Categorias">Teste</MuiFrame>
        <MuiAddButton title="Adicionar Categoria" onClick={handleModal} />
        <ModalCategoria isOpen={isOpenModal} handleModal={handleModal} onSubmit={onSubmit} />
      </Container>
    </>
  );
};
