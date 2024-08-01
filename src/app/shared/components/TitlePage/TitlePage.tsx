import { StyledBox, StyledSubTitle, StyledTitle } from "./styles/style";

interface ITitlePage {
  title: string;
  subTitle: string;
}

export const TitlePage: React.FC<ITitlePage> = ({ title, subTitle }) => {
  return (
    <>
      <StyledBox>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubTitle>{subTitle}</StyledSubTitle>
      </StyledBox>
    </>
  );
};
