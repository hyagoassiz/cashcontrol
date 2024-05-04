import { ListagemCategorias } from "./ListagemCategorias";
import { FilterProvider } from "../contexts/filterContext";

export function CategoriasRoute(): JSX.Element  {
  return (
    <FilterProvider>
      <ListagemCategorias />
    </FilterProvider>
  );
}
