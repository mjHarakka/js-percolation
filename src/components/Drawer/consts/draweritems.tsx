import PeopleIcon from '@mui/icons-material/People'
import ImageIcon from '@mui/icons-material/Image'
import PublicIcon from '@mui/icons-material/Public'
import GitHubIcon from '@mui/icons-material/GitHub'
import InfoIcon from '@mui/icons-material/Info'
import CodeIcon from '@mui/icons-material/Code'
import SettingsIcon from '@mui/icons-material/Settings'

export const draweritems = [
  {
    id: 0,
    icon: <CodeIcon />,
    label: 'Percolation',
    route: 'percolation',
  },
  {
    id: 1,
    icon: <SettingsIcon />,
    label: 'Options',
    route: 'options',
  },
  {
    id: 2,
    icon: <InfoIcon />,
    label: 'About',
    route: 'about',
  },
  {
    id: 3,
    icon: <GitHubIcon />,
    label: 'GitHub',
    url: 'https://github.com/mjHarakka/js-percolation',
  },
]
