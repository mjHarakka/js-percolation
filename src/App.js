import CssBaseline from '@mui/material/CssBaseline'
import DrawerComponent from './components/Drawer/Drawer'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <CssBaseline />
      <DrawerComponent>
        <Outlet />
      </DrawerComponent>
    </>
  )
}

export default App
