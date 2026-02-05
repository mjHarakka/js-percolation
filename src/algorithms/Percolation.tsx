import { useState, useEffect, useMemo } from 'react'
import './Percolation.css'
import { WeightedQuickUnionUF } from './weightedquickuf'

interface PercolationProps {
  data: {
    grid: boolean[][]
    num: number
  }
  onReset?: () => void
  onOpenSite?: (openFn: (row: number, col: number) => void) => void
  onPercolationCheck?: (checkFn: () => boolean) => void
}

export const Percolation = (props: PercolationProps) => {
  const [grid, setGrid] = useState(props.data.grid)
  const n = props.data.num
  const virtualTop = n * n
  const virtualBottom = n * n + 1
  const [UF] = useState(new WeightedQuickUnionUF(props.data.num))

  // Expose open function to parent component
  useEffect(() => {
    if (props.onOpenSite) {
      props.onOpenSite(open)
    }
    if (props.onPercolationCheck) {
      props.onPercolationCheck(percolates)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onOpenSite, props.onPercolationCheck])

  // Transforms 2-dimensional array to single dimension based on index
  const transform = (row: number, column: number) => {
    const length = grid.length

    return row * length + column
  }

  // Open a new site and if there is a vertical or horizontal neighbour, connect
  const open = (row: number, column: number) => {
    // Don't open if already open
    if (grid[row][column]) return

    const newGrid = grid.slice()
    newGrid[row][column] = true
    setGrid(newGrid)

    // Connect to virtual top if in first row
    if (row === 0) {
      UF.union(transform(row, column), virtualTop)
    }

    // Connect to virtual bottom if in last row
    if (row === grid.length - 1) {
      UF.union(transform(row, column), virtualBottom)
    }

    // Check and connect to neighbors (top, bottom, left, right)
    // Top neighbor
    if (row > 0 && grid[row - 1][column]) {
      UF.union(transform(row - 1, column), transform(row, column))
    }
    // Bottom neighbor
    if (row < grid.length - 1 && grid[row + 1][column]) {
      UF.union(transform(row + 1, column), transform(row, column))
    }
    // Left neighbor
    if (column > 0 && grid[row][column - 1]) {
      UF.union(transform(row, column - 1), transform(row, column))
    }
    // Right neighbor
    if (column < grid[row].length - 1 && grid[row][column + 1]) {
      UF.union(transform(row, column + 1), transform(row, column))
    }
  }

  const isFull = (row: number, column: number) => {
    return UF.connected(transform(row, column), virtualTop)
  }

  const percolates = () => {
    return UF.connected(virtualTop, virtualBottom)
  }

  const handleClick = (row: number, column: number) => {
    open(row, column)
  }

  const isPercolating = percolates()

  // Memoize full cells calculation to avoid repeated UF queries during render
  const fullCells = useMemo(() => {
    const cells = new Set<string>()
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] && isFull(row, col)) {
          cells.add(`${row},${col}`)
        }
      }
    }
    return cells
  }, [grid])

  const render = () => {
    return grid.map((row, rowIndex) => {
      return row.map((node, nodeIndex) => {
        if (!node) {
          return (
            <div
              className={`node`}
              key={nodeIndex}
              onClick={() => handleClick(rowIndex, nodeIndex)}
            ></div>
          )
        }
        const isFull = fullCells.has(`${rowIndex},${nodeIndex}`)
        return (
          <div
            className={isFull ? 'node full' : 'node connected'}
            key={nodeIndex}
            onClick={() => handleClick(rowIndex, nodeIndex)}
          ></div>
        )
      })
    })
  }

  return (
    <div
      className={isPercolating ? 'flex percolating' : 'flex'}
      style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
    >
      {render()}
    </div>
  )
}
