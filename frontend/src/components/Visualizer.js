import { Grid } from './styled/Grid'
import { StyledItem } from './styled/Item'
import { percolation } from '../algorithms/Percolation'

const Item = (props) => {
  return <StyledItem onClick={props.onClick} />
}


const Visualizer = () => {
  const p = percolation
  p(2)
  console.log(percolation.grid)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <Grid>
      moi
    </Grid>
  )
}

export default Visualizer
