import { Percolation } from '../algorithms/Percolation'
import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'

const Visualizer = () => {
  const num = 10

  const initializeGrid = () => {
    const grid = []
    for (let i = 0; i < num; i++) {
      grid[i] = []
      for (let j = 0; j < num; j++) {
        grid[i][j] = false
      }
    }
    return grid
  }

  const [grid, setGrid] = useState(initializeGrid())
  const [resetKey, setResetKey] = useState(0)

  const runSimulation = () => {
    // TODO: Implement simulation
  }

  const resetGrid = () => {
    setGrid(initializeGrid())
    setResetKey((prev) => prev + 1)
  }

  return (
    <>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' onClick={() => runSimulation()}>
          Simulate
        </Button>
        <Button variant='contained' onClick={resetGrid}>
          Reset grid
        </Button>
      </Stack>
      <Percolation key={resetKey} data={{ grid, num }} onReset={resetGrid} />
    </>
  )
}

export default Visualizer
