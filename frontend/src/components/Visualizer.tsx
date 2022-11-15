import { Percolation } from '../algorithms/Percolation'
import { Button } from '@mui/material'
import { Stack } from '@mui/system'

const Visualizer = () => {
  const num = 10
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

  const runSimulation = () => {
    console.log('clicked simulation')
  }

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => runSimulation()}>
          Simulate
        </Button>
        <Button variant="contained">Reset grid</Button>
      </Stack>
      <Percolation data={{ grid, parent, size, n, num }}></Percolation>
    </>
  )
}

export default Visualizer
