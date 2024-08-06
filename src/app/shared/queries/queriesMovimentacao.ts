import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ITransacao, IReturnBackEnd } from "../interfaces";
import { db } from "../../../FirebaseConnection";

export const queryListarMovimentacoes = async function (
  usuario: string
): Promise<ITransacao[]> {
  try {
    const movimentacoesQuery = query(
      collection(db, "movimentacao"),
      where("usuario", "==", usuario)
    );

    const querySnapshot = await getDocs(movimentacoesQuery);
    const movimentacoes: ITransacao[] = [];

    querySnapshot.forEach((doc) => {
      const movimentacaoData = doc.data();
      const movimentacao: ITransacao = {
        id: doc.id,
        usuario: movimentacaoData.usuario,
        data: movimentacaoData.data,
        tipo: movimentacaoData.tipo,
        categoria: movimentacaoData.categoria,
        conta: movimentacaoData.conta,
        valor: movimentacaoData.valor,
        pago: movimentacaoData.pago,
        observacao: movimentacaoData.observacao,
      };
      movimentacoes.push(movimentacao);
    });

    return movimentacoes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const queryAdicionarMovimentacao = async function (
  payload: ITransacao
): Promise<IReturnBackEnd> {
  try {
    const { id, ...payloadWithoutId } = payload;
    await addDoc(collection(db, "movimentacao"), payloadWithoutId);
    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 404,
      message: "error",
    };
  }
};

export const queryEditarMovimentacao = async function (
  payload: ITransacao
): Promise<IReturnBackEnd> {
  try {
    const { id, ...updateData } = payload;

    if (!id) {
      throw new Error("ID não fornecido");
    }

    const movimentacaoRef = doc(db, "movimentacao", id);

    const movimentacaoDoc = await getDoc(movimentacaoRef);
    if (!movimentacaoDoc.exists()) {
      throw new Error("Documento não encontrado");
    }

    await updateDoc(movimentacaoRef, updateData);

    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 404,
      message: "error",
    };
  }
};

export const queryExcluirMovimentacao = async function (
  payload: ITransacao
): Promise<IReturnBackEnd> {
  try {
    const { id, usuario } = payload;

    if (!id || !usuario) {
      throw new Error("ID do registro ou ID do usuário não fornecido");
    }

    const movimentacaoRef = doc(db, "movimentacao", id);

    const movimentacaoDoc = await getDoc(movimentacaoRef);
    if (!movimentacaoDoc.exists()) {
      throw new Error("Documento não encontrado");
    }

    const data = movimentacaoDoc.data();
    if (data?.usuario !== usuario) {
      throw new Error("Usuário não autorizado para excluir esta movimentação");
    }

    await deleteDoc(movimentacaoRef);

    return {
      status: 200,
      message: "Movimentação excluída com sucesso",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 404,
      message: "Erro ao excluir movimentação",
    };
  }
};
