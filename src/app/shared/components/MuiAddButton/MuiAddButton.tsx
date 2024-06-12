import { Button, Tooltip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface FloatingButtonPros {
  tooltip: string;
  title: "ADICIONAR" | "CRIAR" | "NOVA" | "NOVO";
  onClick: () => void;
}

const MuiAddButton: React.FC<FloatingButtonPros> = ({
  onClick,
  tooltip,
  title,
}) => {
  return (
    <Tooltip placement="top" title={tooltip}>
      <Button
        variant="contained"
        sx={{
          display: "flex !important",
          margin: "12px 17px 92px auto"
        }}
        onClick={onClick}
      >
        {title}
        <AddCircleIcon color="inherit"
          style={{ marginLeft: "1px", height: "18px" }}
        />
      </Button>
    </Tooltip>
  );
};

export default MuiAddButton;
