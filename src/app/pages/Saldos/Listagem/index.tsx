import { ListagemProvider } from "./context";
import { Listagem } from "./Listagem";

export function SaldosRoute(): JSX.Element {
  return (
    <ListagemProvider>
      <Listagem />
    </ListagemProvider>
  );
}
