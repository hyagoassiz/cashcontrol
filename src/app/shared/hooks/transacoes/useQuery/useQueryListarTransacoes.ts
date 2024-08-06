import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ITransacao } from "../../../interfaces";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../FirebaseConnection";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/interfaces";

export const KEY_LISTAR_TRANSACOES = "key-listar-transacoes" as const;

export const useQueryListarTransacoes = (): UseQueryResult<
  ITransacao[] | undefined
> => {
  const user = useSelector((state: RootState) => state.user);
  return useQuery({
    queryKey: [KEY_LISTAR_TRANSACOES],
    queryFn: () => queryListarTransacoes(user.uid),
  });
};

export const queryListarTransacoes = async function (
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
    console.error("Erro ao obter contas do usuário:", error);
    throw error;
  }
};
