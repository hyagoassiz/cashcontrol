import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { ChangeEventHandler } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  placeholder?: string;
  onClickClose: () => void;
  value: string | number;
  onChange:
    | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  onClickClose,
  value,
  onChange,
}) => {
  const theme = useTheme();
  return (
    <TextField
      fullWidth
      id="outlined-search"
      variant="standard"
      color="primary"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        style: {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
          height: theme.spacing(4),
          width: "100%",
        },
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="info" />
          </InputAdornment>
        ),
        endAdornment: (
          <Tooltip title="Fechar" placement="top">
            <IconButton onClick={onClickClose}>
              <CloseIcon color="info" fontSize={"small"} />
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
};

export default SearchBar;
