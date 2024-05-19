import { db } from "../../../../FirebaseConnection";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { IConta, IFilterData } from "../interfaces";
import { IReturnBackEnd } from "../../../shared/interfaces/IReturnBackEnd";

export const obterContasPorUsuario = async function (
    usuario: string,
    filterData: IFilterData // 'ativo' é uma lista de booleanos
  ): Promise<IConta[]> {
    try {
      // Crie uma consulta base para a coleção 'categoria'
      const contasQuery = query(
        collection(db, "conta"),
        where("usuario", "==", usuario),
        where("ativo", "in", filterData.ativo), 
      );
  
      // Execute a consulta
      const querySnapshot = await getDocs(contasQuery);
      const contas: IConta[] = [];
  
      // Mapeie os resultados da consulta para objetos ICategoria
      querySnapshot.forEach((doc) => {
        const contaData = doc.data();
        const conta: IConta = {
          id: doc.id,
          usuario: contaData.usuario,
          nome: contaData.nome,
          tipoConta: contaData.tipoConta,
          incluirSoma: contaData.incluirSoma,
          agencia: contaData.agencia,
          conta: contaData.conta,
          observacao: contaData.observacao,
          ativo: contaData.ativo
        };
        contas.push(conta);
      });
  
      return contas;
    } catch (error) {
      console.error("Erro ao obter categorias do usuário do Firestore:", error);
      return [];
    }
  };

  export const adcionarConta = async function (
    data: IConta
  ): Promise<IReturnBackEnd> {
    try {
      await addDoc(collection(db, "conta"), data);
      return {
        status: 200,
        message: "success",
      };
    } catch (error) {
      console.error("Erro ao enviar dados para o Firestore:", error);
      return {
        status: 404,
        message: "error",
      };
    }
  };