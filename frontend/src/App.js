import { useEffect, useState } from 'react'
import axios from 'axios'
import Visualizer from './components/Visualizer.js'
import { Container } from './components/styled/Container.js'
import { Flex } from './components/styled/Flex.js'

const API = 'http://localhost:3001/'

const App = () => {
  const [data, setData] = useState(null)
  const [size, setSize] = useState('')

  useEffect(() => {
    axios.get(API).then((res) => {
      setData(res.data)
    })
  }, [])

  const postData = async () => {
    try {
      const response = await axios.post(API, { value: size })
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onChange = (e) => {
    e.preventDefault()
    setSize(e.target.value)
  }

  return (
    <Container>
      <Flex>
        <br></br>
        <input placeholder="size" value={size} onChange={onChange}></input>
        <button onClick={postData}>send</button>
        {data ? <Visualizer data={data}></Visualizer> : null}
      </Flex>
    </Container>
  )
}

export default App
