export interface IUseSelector {
  snackbar: {
    message: string;
    type: "error" | "info" | "success" | "warning";
    open: boolean;
  };
}
