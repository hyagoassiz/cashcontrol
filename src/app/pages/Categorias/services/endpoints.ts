import { IReturnBackEnd } from "../../../shared/interfaces/IReturnBackEnd";
import { ICategoria } from "../interfaces";
import { db } from "../../../../FirebaseConnection";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const adcionarCategoria = async function (
  data: ICategoria
): Promise<IReturnBackEnd> {
  try {
    await addDoc(collection(db, "categoria"), data);
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
  usuario: string
): Promise<ICategoria[]> {
  try {
    const categoriasQuery = query(
      collection(db, "categoria"),
      where("usuario", "==", usuario)
    );

    const querySnapshot = await getDocs(categoriasQuery);
    const categorias: ICategoria[] = [];

    querySnapshot.forEach((doc) => {
      const categoriaData = doc.data();
      const categoria: ICategoria = {
        id: doc.id,
        usuario: categoriaData.usuario,
        nome: categoriaData.nome,
        tipo: categoriaData.tipo,
        ativo: categoriaData.ativo
      };
      categorias.push(categoria);
    });

    return categorias;
  } catch (error) {
    console.error("Erro ao obter categorias do usuário do Firestore:", error);
    return [];
  }
};