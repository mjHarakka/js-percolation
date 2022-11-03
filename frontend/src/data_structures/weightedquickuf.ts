export const weightedquickuf = (n: number) => {
  let count = n
  const parent = new Array<number>()
  const size = new Array<number>()

  for (let i = 0; i < n; i++) {
    parent[i] = i
    size[i] = 1
  }

  const connected = (p: number, q: number) => {
    return find(p) == find(q)
  }

  const validate = (p: number) => {
    const n = parent.length
    if (p < 0 || p >= n) {
      throw new Error('index ' + p + ' is not between 0 and ' + (n - 1))
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
      parent[rootP] = rootQ[rootQ].length += [rootP].length
    } else {
      parent[rootQ] = rootP[rootP].length += [rootQ].length
    }
    count--
  }
}
