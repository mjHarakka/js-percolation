import { WeightedQuickUnionUF } from '../data_structures/weightedquickuf'

export class Percolation {
  private grid: Boolean[][]
  private UF
  private virtualTop: number
  private virtualBottom: number

  constructor(n: number) {
    this.grid = []
    this.virtualTop = n * n
    this.virtualBottom = n * n + 1
    this.UF = new WeightedQuickUnionUF(n * n + 2)
    // n by n grid with all sites blocked
    for (let i = 0; i < n; i++) {
      this.grid[i] = []
      for (let j = 0; j < n; j++) {
        this.grid[i][j] = false
      }
    }
  }

  // Transforms 2-dimensional array to single dimension based on index
  private transform(row: number, column: number) {
    const length = this.grid.length

    return row * length + column
  }

  public open(row: number, column: number) {
    this.grid[row][column] = true

    if (row === 0) {
      this.UF.union(this.transform(row, column), this.virtualTop)
    }

    if (row === this.grid.length - 1) {
      this.UF.union(this.transform(row, column), this.virtualBottom)
    }

    if (row === 0) {
      if (this.grid[row + 1][column]) {
        this.UF.union(
          this.transform(row + 1, column),
          this.transform(row, column)
        )
      }
    } else if (row === this.grid.length - 1) {
      if (this.grid[row - 1][column]) {
        this.UF.union(
          this.transform(row - 1, column),
          this.transform(row, column)
        )
      }
    } else if (row > 0 && row < this.grid.length - 1) {
      if (this.grid[row + 1][column]) {
        this.UF.union(
          this.transform(row + 1, column),
          this.transform(row, column)
        )
      }
      if (this.grid[row - 1][column]) {
        this.UF.union(
          this.transform(row - 1, column),
          this.transform(row, column)
        )
      }
      if (this.grid[row][column + 1]) {
        this.UF.union(
          this.transform(row, column + 1),
          this.transform(row, column)
        )
      }
      if (this.grid[row][column - 1]) {
        this.UF.union(
          this.transform(row, column - 1),
          this.transform(row, column)
        )
      }
    }
  }

  public isFull(row: number, column: number) {
    return this.UF.connected(this.transform(row, column), this.virtualTop)
  }

  public percolates() {
    return this.UF.connected(this.virtualTop, this.virtualBottom)
  }

  public getGrid() {
    return this.grid
  }
}
