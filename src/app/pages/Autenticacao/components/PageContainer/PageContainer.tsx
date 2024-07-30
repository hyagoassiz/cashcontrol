import { Grid, Typography } from "@mui/material";
import { BoxContainer, BoxMain } from "./styles/style";
import { ReactNode } from "react";

interface IPageContainer {
  children: ReactNode;
  titleRoute: string;
  onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
}

export const PageContainer: React.FC<IPageContainer> = ({
  children,
  titleRoute,
  onKeyDown,
}) => {
  return (
    <>
      <BoxMain onKeyDown={onKeyDown}>
        <BoxContainer>
          <Typography component="h1" variant="h5">
            {titleRoute}
          </Typography>

          <Grid container spacing={2} xs={12} sx={{ marginTop: "16px" }}>
            {children}
          </Grid>
        </BoxContainer>
      </BoxMain>
    </>
  );
};
