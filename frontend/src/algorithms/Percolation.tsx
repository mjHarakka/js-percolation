import { weightedquickuf } from '../data_structures/weightedquickuf'

export const percolation = (n: number) => {
  const grid = new Array()
  const UF = new weightedquickuf(n * n + 2)

  const virtualTop = n * n
  const virtualBottom = n * n + 1

  for (let i = 0; i < n; i++) {
    grid[i] = []
    for (let j = 0; j < n; j++) {
      grid[i][j] = false
    }
  }

  // Transforms 2-dimensional array to single dimension based on index
  const transform = (row: number, column: number) => {
    const length = grid.length

    return row * length + column
  }

  const open = (row: number, column: number) => {
    grid[row][column] = true

    if (row === 0) {
      UF.union(transform(row, column), virtualTop)
    }

    if (row === grid.length - 1) {
      UF.union(transform(row, column), virtualBottom)
    }

    if (row === 0) {
      if (grid[row + 1][column]) {
        UF.union(transform(row + 1, column), transform(row, column))
      }
    } else if (row === grid.length - 1) {
      if (grid[row - 1][column]) {
        UF.union(transform(row - 1, column), transform(row, column))
      }
    } else if (row > 0 && row < grid.length - 1) {
      if (grid[row + 1][column]) {
        UF.union(transform(row + 1, column), transform(row, column))
      }
      if (grid[row - 1][column]) {
        UF.union(transform(row - 1, column), transform(row, column))
      }
      if (grid[row][column + 1]) {
        UF.union(transform(row, column + 1), transform(row, column))
      }
      if (grid[row][column - 1]) {
        UF.union(transform(row, column - 1), transform(row, column))
      }
    }
  }

  const isFull = (row: number, column: number) => {
    return UF.connected(transform(row, column), virtualTop)
  }

  const percolates = () => {
    return UF.connected(virtualTop, virtualBottom)
  }

  return (
    <div>
      
    </div>
  )

}
