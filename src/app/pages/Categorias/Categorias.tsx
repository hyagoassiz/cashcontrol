import {  Container } from "@mui/material";
import MuiAddButton from "../../shared/components/MuiAddButton/MuiAddButton";
import { MuiAppBar } from "../../shared/components/MuiAppBar/AppBar";
import { MuiFrame } from "../../shared/components/MuiFrame/MuiFrame";
import {  useState } from "react";
import { ModalCategoria } from "./components/ModalCategoria/ModalCategoria";
import { ICategoria } from "./interfaces";
import { CategoriaService } from "./services/CategoriaService";
import { useListagemCategorias } from "./hooks/useListagemCategorias";
import { MuiTable } from "../../shared/components/MuiTable/MuiTable";
import { COLLUMS_CATEGORIA } from "./utils/collumnsNames";
import { mountData } from "./utils/mountData";

export const Categorias: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { categorias, setTextFilter, textFilter } = useListagemCategorias();
  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSearchBar = () => {
    setIsOpenSearchBar(!isOpenSearchBar);
  };

  





  const onSubmit = async (data: ICategoria) => {
    try {
      const response = await CategoriaService.criarCategoria(data);
      if (response.success) {
        console.log(response.message); // Mensagem de sucesso
      } else {
        console.error(response.message); // Mensagem de erro
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }

    setIsOpenModal(false);
  };

  return (
    <>
      <MuiAppBar />
      <Container>
        <MuiFrame
          title="Categorias"
          searchBar={{
            open: isOpenSearchBar, // Exemplo de atribuição de valor para a propriedade open
            placeholder: "Buscar categorias...", // Exemplo de atribuição de valor para a propriedade placeholder
            value: textFilter, // Valor do campo de busca
            onChange: (e) => setTextFilter(e.target.value),
            toggleOpen: handleSearchBar , // Função para abrir/fechar a barra de pesquisa
            onClickClose: handleSearchBar, // Função para fechar a barra de pesquisa
          }}

        >
          <MuiTable
            columns={COLLUMS_CATEGORIA}
            data={mountData({  categorias })}
          />
        </MuiFrame>
        <MuiAddButton title="Adicionar Categoria" onClick={handleModal} />
        <ModalCategoria
          isOpen={isOpenModal}
          handleModal={handleModal}
          onSubmit={onSubmit}
        />
      </Container>
    </>
  );
};
