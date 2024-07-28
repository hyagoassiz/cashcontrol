import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ICategoria, IReturnBackEnd } from "../interfaces";
import { db } from "../../../FirebaseConnection";

export const queryListarCategoria = async function (
  usuario: string
): Promise<ICategoria[]> {
  try {
    const categoriasQuery = query(
      collection(db, "categoria"),
      where("usuario", "==", usuario),
      where("ativo", "==", true)
      // where("tipo", "==", "Entrada")
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
        ativo: categoriaData.ativo,
      };
      categorias.push(categoria);
    });

    return categorias;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const queryAdicionarCategoria = async function (
  payload: ICategoria
): Promise<IReturnBackEnd> {
  try {
    const { id, ...payloadWithoutId } = payload;
    await addDoc(collection(db, "categoria"), payloadWithoutId);
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

export const queryEditarCategoria = async function (
  payload: ICategoria
): Promise<IReturnBackEnd> {
  try {
    const { id, ...updateData } = payload;

    if (!id) {
      throw new Error("ID não fornecido");
    }

    const categoriaRef = doc(db, "categoria", id);

    const categoriaDoc = await getDoc(categoriaRef);
    if (!categoriaDoc.exists()) {
      throw new Error("Documento não encontrado");
    }

    await updateDoc(categoriaRef, updateData);

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
