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
        sx={{
          display: "flex !important",
          margin: "12px 17px 92px auto",
          backgroundColor: "#1976D2 !important",
          ":hover": {
            opacity: 0.8,
          },
          color: "white",
          fontSize: "12px",
        }}
        onClick={onClick}
      >
        {title}
        <AddCircleIcon
          style={{ marginLeft: "1px", color: "white", height: "18px" }}
        />
      </Button>
    </Tooltip>
  );
};

export default MuiAddButton;
