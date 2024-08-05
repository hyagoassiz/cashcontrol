import { CircularProgress } from "@mui/material";
import { BoxContainer } from "./style/style";

const LoadingPage: React.FC = () => {
  return (
    <>
      <BoxContainer>
        <CircularProgress color="secondary" />
      </BoxContainer>
    </>
  );
};

export default LoadingPage;
