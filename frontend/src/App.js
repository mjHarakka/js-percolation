import { Percolation } from './algorithms/Percolation.tsx'
import styles from './App.module.css'

const App = () => {
  console.log('render app')
  const num = 50
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
    <div className={styles.container}>
      <Percolation data={{ grid, parent, size, n, num }} />
    </div>
  )
}

export default App
