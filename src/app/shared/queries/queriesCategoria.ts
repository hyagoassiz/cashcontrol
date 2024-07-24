import { collection, getDocs, query, where } from "firebase/firestore";
import { ICategoria } from "../interfaces";
import { db } from "../../../FirebaseConnection";

export const queryListarCategoria = async function (
  usuario: string
): Promise<ICategoria[]> {
  try {
    const categoriasQuery = query(
      collection(db, "categoria"),
      where("usuario", "==", usuario),
      where("ativo", "==", true),
      where("tipo", "==", "Entrada")
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
        incluirSoma: categoriaData.incluirSoma,
      };
      categorias.push(categoria);
    });

    return categorias;
  } catch (error) {
    console.error(error);
    return [];
  }
};
