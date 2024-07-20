import { IReturnBackEnd } from "../../../shared/interfaces/IReturnBackEnd";
import { ICategoria, IFilterData } from "../interfaces";
import { db } from "../../../../FirebaseConnection";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const adcionarCategoria = async function (
  data: ICategoria
): Promise<IReturnBackEnd> {
  try {
    const { id, ...categoriaSemId } = data;

    await addDoc(collection(db, "categoria"), categoriaSemId);

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

export const obterCategoriasPorUsuario = async function (
  usuario: string,
  filterData: IFilterData // 'ativo' é uma lista de booleanos
): Promise<ICategoria[]> {
  try {
    // Crie uma consulta base para a coleção 'categoria'
    const categoriasQuery = query(
      collection(db, "categoria"),
      where("usuario", "==", usuario),
      where("ativo", "in", filterData.ativo), // Aplica o filtro 'ativo' como uma lista de booleanos
      where("tipo", "in", filterData.tipo) // Aplica o filtro 'ativo' como uma lista de booleanos
    );

    // Execute a consulta
    const querySnapshot = await getDocs(categoriasQuery);
    const categorias: ICategoria[] = [];

    // Mapeie os resultados da consulta para objetos ICategoria
    querySnapshot.forEach((doc) => {
      const categoriaData = doc.data();
      const categoria: ICategoria = {
        id: doc.id,
        usuario: categoriaData.usuario,
        nome: categoriaData.nome,
        tipo: categoriaData.tipo,
        ativo: categoriaData.ativo,
        incluirSoma: categoriaData.incluirSoma,
      };
      categorias.push(categoria);
    });

    return categorias;
  } catch (error) {
    console.error("Erro ao obter categorias do usuário do Firestore:", error);
    return [];
  }
};

export const editarSituacaoCategoria = async function (
  id: string,
  ativo: boolean
): Promise<IReturnBackEnd> {
  try {
    const categoriaRef = doc(db, "categoria", id);

    const categoriaDoc = await getDoc(categoriaRef);
    if (!categoriaDoc.exists()) {
      throw new Error("Documento não encontrado");
    }

    await updateDoc(categoriaRef, {
      ativo: ativo,
    });

    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.error("Erro ao editar categoria no Firestore:", error);
    return {
      status: 404,
      message: "error",
    };
  }
};

export const editarCategoria = async function (
  payload: ICategoria
): Promise<IReturnBackEnd> {
  try {
    // Extrair o id do payload
    const { id, ...updateData } = payload;

    // Verificar se o id está presente
    if (!id) {
      throw new Error("ID não fornecido");
    }

    // Referenciar o documento com o id fornecido
    const categoriaRef = doc(db, "categoria", id);

    // Verificar se o documento existe
    const categoriaDoc = await getDoc(categoriaRef);
    if (!categoriaDoc.exists()) {
      throw new Error("Documento não encontrado");
    }

    // Atualizar o documento com os dados fornecidos no payload
    await updateDoc(categoriaRef, updateData);

    return {
      status: 200,
      message: "success",
    };
  } catch (error) {
    console.error("Erro ao editar categoria no Firestore:", error);
    return {
      status: 404,
      message: "error",
    };
  }
};
