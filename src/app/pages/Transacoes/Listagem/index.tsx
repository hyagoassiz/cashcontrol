import { ListagemProvider } from "./context";
import { Listagem } from "./Listagem";

export function TransacoesRoute(): JSX.Element {
  return (
    <ListagemProvider>
      <Listagem />
    </ListagemProvider>
  );
}
