const REPOSITORIO = {
  LIST: "/cashcontrol",
};

//AUTENTICACAO
export const AUTENTICACAO = {
  LOGIN: `${REPOSITORIO.LIST}/login`,
  CREATE: `${REPOSITORIO.LIST}/criar-conta`,
  CHECK: `${REPOSITORIO.LIST}/verificar-email`,
};

//DASHBOARD
export const INICIO = {
  LIST: `${REPOSITORIO.LIST}/inicio`,
};

//MOVIMENTACOES
export const TRANSACOES = {
  LIST: `${REPOSITORIO.LIST}/transacoes`,
};

export const SALDOS = {
  LIST: `${REPOSITORIO.LIST}/saldos`,
};

// SUBCADASTROS
export const CATEGORIAS = {
  LIST: `${REPOSITORIO.LIST}/categorias`,
};

export const CONTAS = {
  LIST: `${REPOSITORIO.LIST}/contas`,
};
