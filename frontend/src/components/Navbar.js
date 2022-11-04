import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          arial-label='logo'
        >
          <CodeIcon />
        </IconButton>
        <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
          JS-PERCOLATION
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button color='inherit'>About</Button>
          <Button color='inherit'>Other links</Button>
          <Button color='inherit'>My github</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
