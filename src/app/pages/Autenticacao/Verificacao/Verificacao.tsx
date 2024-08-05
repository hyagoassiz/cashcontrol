import { Grid, Link, Typography } from "@mui/material";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { useVerificacao } from "./hooks/useVerificacao";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export const Verificacao: React.FC = () => {
  const { handleNavigate, userData } = useVerificacao();

  return (
    <>
      <PageContainer titleRoute="E-mail de verificação enviado">
        <Grid item xs={12}>
          <Typography>
            {`Para acessar sua conta, acesse seu e-mail para ativar a sua conta.`}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", gap: "8px" }}>
          <MarkEmailReadIcon sx={{ color: "green" }} />
          <Typography sx={{ fontStyle: "italic" }}>
            {userData?.email}
          </Typography>
        </Grid>
        <Grid item>
          <Grid item xs>
            <Link
              onClick={handleNavigate}
              variant="body2"
              sx={{ cursor: "pointer" }}
            >
              Faça Login
            </Link>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};
