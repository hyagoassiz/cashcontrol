export interface IOptionsMenu {
  title: "Sub Cadastros" | "Movimentações" | "Configurações";
  routes: {
    name: string;
    route: string;
  }[];
}
