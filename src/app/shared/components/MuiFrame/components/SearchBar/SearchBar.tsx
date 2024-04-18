import { IconButton, InputAdornment, Slide, TextField, Tooltip, useTheme } from '@mui/material'
import { ChangeEventHandler } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  placeholder?: string
  onClickClose: () => void
  value: string | number
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined
}

const SearchBar: React.FC<Props> = ({
  placeholder,
  onClickClose,
  value,
  onChange
}) => {
  const theme = useTheme();
  return (
    <Slide direction="left" in={true} timeout={500}>
      <TextField
        fullWidth
        id="outlined-search"
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        InputProps={{
          style: { paddingLeft: theme.spacing(1), 
            paddingRight: theme.spacing(1),
              height: theme.spacing(7), width: '100%' },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
          endAdornment: (
            <Tooltip title="Fechar" placement="top">
              <IconButton onClick={onClickClose}>
                <CloseIcon fontSize={'small'} style={{ color: '#828D8C' }} />
              </IconButton>
            </Tooltip>
          )
        }}
      />
    </Slide>
  )
}

export default SearchBar
