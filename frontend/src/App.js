import { Percolation } from './algorithms/Percolation.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Navbar from './components/Navbar'
import './App.css'

const App = () => {
  console.log('render app')
  const num = 20 
  const grid = []
  const parent = []
  const size = []
  const n = num * num + 2

  for (let i = 0; i < num; i++) {
    grid[i] = []
    for (let j = 0; j < num; j++) {
      grid[i][j] = false
    }
  }

  for (let i = 0; i < n; i++) {
    parent[i] = i
    size[i] = 1
  }

  return (
    <>
      <Navbar></Navbar>
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex' }}>
          <Percolation data={{ grid, parent, size, n, num }} />
        </Box>
      </Container>
    </>
  )
}

export default App
