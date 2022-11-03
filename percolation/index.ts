const express = require('express')
const app = express()
const cors = require('cors')
const { Percolation } = require('./classes/Percolation')

app.use(cors())
app.use(express.json())

app.post('/', (req, res) => {
  const value = Number(req.body.value)
  console.log(value)
  res.send(new Percolation(value))
})

app.get('/', (req, res) => {
  res.send(new Percolation(5))
})

app.listen(3001)
