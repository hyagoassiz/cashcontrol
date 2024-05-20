import { IConta, IFilterData } from "../interfaces";
import { adcionarConta, ativarInativarConta, obterContasPorUsuario } from "./endpoints";

export const ContaService = {
  async obterCategoriasPorUsuario(
    usuario: string,
    filterData: IFilterData
  ): Promise<IConta[]> {
    try {
      const contas = await obterContasPorUsuario(usuario, filterData);
      console.log(filterData);
      return contas;
    } catch (error) {
      console.error("Erro ao obter contas do usuário:", error);
      return [];
    }
  },
  async criarConta(contaData: IConta) {
    try {
      const response = await adcionarConta(contaData);
      if (response.status === 200) {
        return { success: true, message: "Conta adicionada com sucesso!" };
      } else {
        return { success: false, message: "Erro ao adicionar conta." };
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      return {
        success: false,
        message: "Erro ao criar conta. Verifique sua conexão com a internet.",
      };
    }
  },
  async ativarInativarConta(id: string, ativo: boolean) {
    try {
      const response = await ativarInativarConta(id, ativo);
      if (response.status === 200) {
        return { success: true, message: "Conta editada com sucesso!" };
      } else {
        return { success: false, message: "Erro ao editar conta." };
      }
    } catch (error) {
      console.error("Erro ao editar conta:", error);
      return {
        success: false,
        message:
          "Erro ao editar conta. Verifique sua conexão com a internet.",
      };
    }
  },
};
