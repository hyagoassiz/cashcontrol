import { ListagemContasProvider } from "./contexts";
import { ListagemContas } from "./ListagemContas";

export function ContasRoute(): JSX.Element {
  return (
    <ListagemContasProvider>
      <ListagemContas />
    </ListagemContasProvider>
  );
}
