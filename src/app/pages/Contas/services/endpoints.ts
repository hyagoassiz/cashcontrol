import { db } from "../../../../FirebaseConnection";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
      where("tipoConta", "in", filterData.tipoConta)
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
        ativo: contaData.ativo,
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

export const editarConta = async function (
  id: string,
  data: Partial<IConta>
): Promise<IReturnBackEnd> {
  try {
    const contaRef = doc(db, "conta", id);
    await updateDoc(contaRef, data);
    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.error("Erro ao atualizar dados no Firestore:", error);
    return {
      status: 404,
      message: "error",
    };
  }
};

export const ativarInativarConta = async function (
  id: string,
  ativo: boolean
): Promise<IReturnBackEnd> {
  try {
    const contaRef = doc(db, "conta", id);
    
    const contaDoc = await getDoc(contaRef);
    if (!contaDoc.exists()) {
      throw new Error("Conta não encontrada");
    }

    await updateDoc(contaRef, {
      ativo: ativo
    });

    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.error("Erro ao editar conta no Firestore:", error);
    return {
      status: 404,
      message: "error",
    };
  }
};
