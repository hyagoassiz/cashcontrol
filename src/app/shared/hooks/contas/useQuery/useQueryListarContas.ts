import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IConta } from "../../../interfaces";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../FirebaseConnection";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/interfaces";

export const KEY_LISTAR_CONTAS = "key-listar-contas" as const;

type TipoConta = "Conta Corrente" | "Poupança" | "Investimentos" | "Outros";

interface IPayload {
  ativo: boolean[];
  tipoConta: TipoConta[];
}

export const useQueryListarContas = (
  payload: IPayload
): UseQueryResult<IConta[] | undefined> => {
  const user = useSelector((state: RootState) => state.user);
  return useQuery({
    queryKey: [KEY_LISTAR_CONTAS, payload],
    queryFn: () => queryListarContas(user.uid, payload),
  });
};

const queryListarContas = async function (
  usuario: string,
  payload: IPayload
): Promise<IConta[]> {
  try {
    const contasQuery = query(
      collection(db, "conta"),
      where("usuario", "==", usuario),
      where("ativo", "in", payload.ativo),
      where("tipoConta", "in", payload.tipoConta)
    );

    const querySnapshot = await getDocs(contasQuery);
    const contas: IConta[] = [];

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
    console.error("Erro ao obter contas do usuário:", error);
    throw error;
  }
};
