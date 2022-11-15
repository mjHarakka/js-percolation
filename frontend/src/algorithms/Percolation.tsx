import { useState } from 'react'
import './Percolation.css'
import { WeightedQuickUnionUF } from './weightedquickuf'

export const Percolation = (props) => {
  const [grid, setGrid] = useState(props.data.grid)
  const n = props.data.num
  const virtualTop = n * n
  const virtualBottom = n * n + 1
  console.log(props.data.num)
  const [UF, setUF] = useState(new WeightedQuickUnionUF(props.data.num))

  // Transforms 2-dimensional array to single dimension based on index
  const transform = (row: number, column: number) => {
    const length = grid.length

    return row * length + column
  }

  // Open a new site and and if there is a vertical or diagonal neighbour, connect
  const open = (row: number, column: number) => {
    const newGrid = grid.slice()
    newGrid[row][column] = true

    setGrid(newGrid)

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

  const handleClick = (row, column) => {
    console.log('handle click!')
    open(row, column)
  }

  const nodeSize = 1000 / props.data.num

  const render = () => {
    return grid.map((row, rowIndex) => {
      return row.map((node, nodeIndex) => {
        if (!node) {
          return (
            <div
              style={{ width: `${nodeSize}px`, height: `${nodeSize}px` }}
              className={`node`}
              key={nodeIndex}
              onClick={() => handleClick(rowIndex, nodeIndex)}
            ></div>
          )
        }
        if (isFull(rowIndex, nodeIndex)) {
          return (
            <div
              style={{ width: nodeSize, height: nodeSize }}
              className={'node full'}
              key={nodeIndex}
              onClick={() => handleClick(rowIndex, nodeIndex)}
            ></div>
          )
        }
        return (
          <div
            style={{ width: nodeSize, height: nodeSize }}
            className={'node connected'}
            key={nodeIndex}
            onClick={() => handleClick(rowIndex, nodeIndex)}
          ></div>
        )
      })
    })
  }

  return <div className="flex">{render()}</div>
}
