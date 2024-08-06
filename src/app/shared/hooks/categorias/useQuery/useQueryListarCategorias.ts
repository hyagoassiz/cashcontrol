import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ICategoria } from "../../../interfaces";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../FirebaseConnection";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/interfaces";

export const KEY_LISTAR_CATEGORIAS = "key-listar-categorias" as const;

type TipoCategoria = "Entrada" | "Saída";

interface IPayload {
  tipo: TipoCategoria[];
  ativo: boolean[];
}

export const useQueryListarCategorias = (
  payload: IPayload
): UseQueryResult<ICategoria[] | undefined> => {
  const user = useSelector((state: RootState) => state.user);
  return useQuery({
    queryKey: [KEY_LISTAR_CATEGORIAS, payload],
    queryFn: () => queryListarCategorias(user.uid, payload),
  });
};

const queryListarCategorias = async function (
  usuario: string,
  payload: IPayload
): Promise<ICategoria[]> {
  try {
    const categoriasQuery = query(
      collection(db, "categoria"),
      where("usuario", "==", usuario),
      where("ativo", "in", payload.ativo),
      where("tipo", "in", payload.tipo)
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
    console.error("Erro ao obter categorias do usuário:", error);
    throw error;
  }
};
