const { Percolation } = require('./classes/Percolation')

const p = new Percolation(5)

console.log('percolates?', p.percolates(4, 0))
p.open(4,0)
p.open(3,0)
p.open(2,0)
p.open(1,0)
console.log('percolates?', p.percolates(4, 0))
p.open(0,0)

console.log('percolates?', p.percolates(4, 0))