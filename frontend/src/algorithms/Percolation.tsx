import { Grid } from '../components/styled/Grid'
import { Node } from '../components/styled/Node'

export const Percolation = () => {
  const grid = []
  const n = 5
  const virtualTop = n * n
  const virtualBottom = n * n + 1

  for (let i = 0; i < n; i++) {
    grid[i] = []
    for (let j = 0; j < n; j++) {
      grid[i][j] = false
    }
  }

  let count = n * n
  const parent = new Array<number>()
  const size = new Array<number>()

  for (let i = 0; i < n; i++) {
    parent[i] = i
    size[i] = 1
  }

  // Transforms 2-dimensional array to single dimension based on index
  const transform = (row: number, column: number) => {
    const length = grid.length

    return row * length + column
  }

  const open = (row: number, column: number) => {
    grid[row][column] = true

    if (row === 0) {
      console.log(row, column)
      union(transform(row, column), virtualTop)
    }

    if (row === grid.length - 1) {
      union(transform(row, column), virtualBottom)
    }

    if (row === 0) {
      if (grid[row + 1][column]) {
        union(transform(row + 1, column), transform(row, column))
      }
    } else if (row === grid.length - 1) {
      if (grid[row - 1][column]) {
        union(transform(row - 1, column), transform(row, column))
      }
    } else if (row > 0 && row < grid.length - 1) {
      if (grid[row + 1][column]) {
        union(transform(row + 1, column), transform(row, column))
      }
      if (grid[row - 1][column]) {
        union(transform(row - 1, column), transform(row, column))
      }
      if (grid[row][column + 1]) {
        union(transform(row, column + 1), transform(row, column))
      }
      if (grid[row][column - 1]) {
        union(transform(row, column - 1), transform(row, column))
      }
    }
  }

  const isFull = (row: number, column: number) => {
    return connected(transform(row, column), virtualTop)
  }

  const percolates = () => {
    return connected(virtualTop, virtualBottom)
  }

  const handleClick = (a, b) => {
    console.log('clicked')
    open(a, b)
  }

  const connected = (p: number, q: number) => {
    return find(p) == find(q)
  }

  const validate = (p: number) => {
    const j = n * n + 2
    if (p < 0 || p >= j) {
      throw new Error('index ' + p + ' is not between 0 and ' + (j - 1))
    }
  }

  const find = (p: number) => {
    validate(p)
    while (p != parent[p]) {
      p = parent[p]
    }
    return p
  }

  const union = (p: number, q: number) => {
    let rootP = find(p)
    let rootQ = find(q)
    if (rootP == rootQ) return

    // make smaller root point to larger one
    if ([rootP].length < [rootQ].length) {
      parent[rootP] = rootQ
      ;[rootQ].length += [rootP].length
    } else {
      parent[rootQ] = rootP
      ;[rootP].length += [rootQ].length
    }
    count--
  }

  return (
    <div>
      <Grid>
        {grid.map((row, rowIndex) => {
          return row.map((node, nodeIndex) => {
            if (node) {
              return (
                <Node
                  backgroundColor="red"
                  key={nodeIndex}
                  onClick={() => handleClick(rowIndex, nodeIndex)}
                ></Node>
              )
            } else if (isFull(rowIndex, nodeIndex)) {
              return (
                <Node
                  backgroundColor="orange"
                  key={nodeIndex}
                  onClick={() => handleClick(rowIndex, nodeIndex)}
                ></Node>
              )
            } else {
              return (
                <Node
                  backgroundColor="yellow"
                  key={nodeIndex}
                  onClick={() => handleClick(rowIndex, nodeIndex)}
                ></Node>
              )
            }
          })
        })}
      </Grid>
    </div>
  )
}
