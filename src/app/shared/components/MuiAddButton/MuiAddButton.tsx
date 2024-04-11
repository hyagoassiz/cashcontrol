import { Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface FloatingButtonPros {
  title: string
  onClick: () => void
}

const MuiAddButton: React.FC<FloatingButtonPros> = ({ onClick, title }) => {
  return (
    <Tooltip placement="top" title={title}>
      <Fab
        sx={{
          display: 'flex !important',
          margin: '12px 17px 92px auto',
          backgroundColor: '#1976D2 !important',
          ':hover': {
            opacity: 0.8
          }
        }}
        onClick={onClick}>
        <AddIcon style={{ color: 'white' }} />
      </Fab>
    </Tooltip>
  )
}

export default MuiAddButton
