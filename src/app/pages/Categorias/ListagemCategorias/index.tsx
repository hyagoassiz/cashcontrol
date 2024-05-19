import { ListagemCategorias } from "./ListagemCategorias";
import { ListagemCategoriasProvider } from "../contexts";

export function CategoriasRoute(): JSX.Element  {
  return (
    <ListagemCategoriasProvider>
      <ListagemCategorias />
    </ListagemCategoriasProvider>
  );
}
