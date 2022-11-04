import { Container } from './components/styled/Container.js'
import { Percolation } from './algorithms/Percolation.tsx'

const App = () => {
  console.log('render app')
  const num = 5
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
    <Container>
      <Percolation data={{ grid, parent, size, n, num }} />
    </Container>
  )
}

export default App
