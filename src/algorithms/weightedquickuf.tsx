export class WeightedQuickUnionUF {
  private count: number
  private n: number
  private parent: Array<number>
  private size: Array<number>

  public constructor(n: number) {
    this.count = n * n + 2
    this.n = n * n + 2
    this.parent = new Array<number>()
    this.size = new Array<number>()
    for (let i = 0; i < this.count; i++) {
      this.parent[i] = i
      this.size[i] = 1
    }
  }

  public getCount() {
    return this.count
  }

  public connected(p: number, q: number) {
    return this.find(p) === this.find(q)
  }

  private validate(p: number) {
    const j = this.n
    if (p < 0 || p >= j) {
      throw new Error('index ' + p + ' is not between 0 and ' + (j - 1))
    }
  }

  public find(p: number) {
    this.validate(p)
    while (p !== this.parent[p]) {
      p = this.parent[p]
    }
    return p
  }

  public union(p: number, q: number) {
    let rootP = this.find(p)
    let rootQ = this.find(q)
    if (rootP === rootQ) return

    // make smaller root point to larger one
    if (this.size[rootP] < this.size[rootQ]) {
      this.parent[rootP] = rootQ
      this.size[rootQ] += this.size[rootP]
    } else {
      this.parent[rootQ] = rootP
      this.size[rootP] += this.size[rootQ]
    }
    this.count--
  }
}
