import { Grid } from './styled/Grid'
import { StyledItem } from './styled/Item'

const Item = (props) => {
  return <StyledItem onClick={props.onClick} />
}

const Visualizer = (props) => {
  const percolation = props.data

  console.log(percolation)

  const handleClick = () => {
    console.log('clicked')
  }
  console.log(percolation)

  return (
    <Grid>
      {percolation.grid.map((node) => {
        return node.map((element) => {
          return <Item onClick={handleClick} />
        })
      })}
    </Grid>
  )
}

export default Visualizer
