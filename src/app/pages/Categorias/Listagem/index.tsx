import { ListagemCategoriasProvider } from "./contexts";
import { ListagemCategorias } from "./Listagem";

export function CategoriasRoute(): JSX.Element  {
  return (
    <ListagemCategoriasProvider>
      <ListagemCategorias />
    </ListagemCategoriasProvider>
  );
}
