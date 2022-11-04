import { useEffect, useState } from 'react'
import { Grid } from '../components/styled/Grid'
import { Node } from '../components/styled/Node'

export const Percolation = (props) => {
  const [grid, setGrid] = useState(props.data.grid)
  const [parent, setParent] = useState(props.data.parent)
  const [size, setSize] = useState(props.data.size)
  const n = props.data.num
  const [count, setCount] = useState(n * n)
  const virtualTop = n * n
  const virtualBottom = n * n + 1

  // Transforms 2-dimensional array to single dimension based on index
  const transform = (row: number, column: number) => {
    const length = grid.length

    return row * length + column
  }

  const open = (row: number, column: number) => {
    const newGrid = grid.slice()
    newGrid[row][column] = true

    setGrid(newGrid)

    if (row === 0) {
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

  const connected = (p: number, q: number) => {
    console.log('connected:', p, q)
    console.log('connected?', find(p) === find(q))
    return find(p) === find(q)
  }

  const validate = (p: number) => {
    const j = n * n + 2
    if (p < 0 || p >= j) {
      throw new Error('index ' + p + ' is not between 0 and ' + (j - 1))
    }
  }

  const find = (p: number) => {
    validate(p)
    while (p !== parent[p]) {
      p = parent[p]
    }
    return p
  }

  const union = (p: number, q: number) => {
    console.log('union:', p, q)
    const rootP = find(p)
    const rootQ = find(q)
    if (rootP === rootQ) return

    // make smaller root point to larger one
    if (size[rootP] < size[rootQ]) {
      parent[rootP] = rootQ
      size[rootQ] += size[rootP]
    } else {
      parent[rootQ] = rootP
      size[rootP] += size[rootQ]
    }
    setCount(count - 1)
  }

  const handleClick = (row, column) => {
    console.log('handle click!')
    open(row, column)
  }

  const render = () => {
    return grid.map((row, rowIndex) => {
      return row.map((node, nodeIndex) => {
        if (!node) {
          return (
            <Node
              backgroundColor="orange"
              key={nodeIndex}
              onClick={() => handleClick(rowIndex, nodeIndex)}
            >
              connected
            </Node>
          )
        }
        if (isFull(rowIndex, nodeIndex)) {
          return (
            <Node
              backgroundColor="grey"
              key={nodeIndex}
              onClick={() => handleClick(rowIndex, nodeIndex)}
            >
              connected
            </Node>
          )
        }
        if (node) {
          return (
            <Node
              backgroundColor="red"
              key={nodeIndex}
              onClick={() => handleClick(rowIndex, nodeIndex)}
            >
              connected
            </Node>
          )
        }
      })
    })
  }

  return <Grid>{render()}</Grid>
}
