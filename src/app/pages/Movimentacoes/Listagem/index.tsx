import { ListagemProvider } from "./context";
import { Listagem } from "./Listagem";

export function MovimentacoesRoute(): JSX.Element {
  return (
    <ListagemProvider>
      <Listagem />
    </ListagemProvider>
  );
}
