import { Grid } from './styled/Grid'
import { StyledItem } from './styled/Item'
import { percolation } from '../algorithms/Percolation'

const Item = (props) => {
  return <StyledItem onClick={props.onClick} />
}

const Visualizer = () => {
  const handleClick = () => {
    console.log('clicked')
  }

  return <Grid>moi</Grid>
}

export default Visualizer
