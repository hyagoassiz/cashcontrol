import { collection, getDocs, query, where } from "firebase/firestore";
import { IConta } from "../interfaces";
import { db } from "../../../FirebaseConnection";

export const queryListarConta = async function (
  usuario: string
): Promise<IConta[]> {
  try {
    const contasQuery = query(
      collection(db, "conta"),
      where("usuario", "==", usuario),
      where("ativo", "==", true)
    );

    const querySnapshot = await getDocs(contasQuery);
    const contas: IConta[] = [];

    querySnapshot.forEach((doc) => {
      const contaData = doc.data();
      const conta: IConta = {
        id: doc.id,
        usuario: contaData.usuario,
        agencia: contaData.agencia,
        conta: contaData.conta,
        observacao: contaData.observacao,
        tipoConta: contaData.tipoConta,
        nome: contaData.nome,
        ativo: contaData.ativo,
        incluirSoma: contaData.incluirSoma,
      };
      contas.push(conta);
    });

    return contas;
  } catch (error) {
    console.error(error);
    return [];
  }
};
