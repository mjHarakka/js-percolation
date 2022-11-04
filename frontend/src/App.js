import { Container } from './components/styled/Container.js'
import { Percolation } from './algorithms/Percolation.tsx'

const App = () => {
  console.log('render app')

  const grid = []
  const parent = []
  const size = []
  const n = 5

  for (let i = 0; i < n; i++) {
    grid[i] = []
    for (let j = 0; j < n; j++) {
      grid[i][j] = false
    }
  }

  for (let i = 0; i < n; i++) {
    parent[i] = i
    size[i] = 1
  }

  return (
    <Container>
      <Percolation data={{ grid, parent, size, n }} />
    </Container>
  )
}

export default App
