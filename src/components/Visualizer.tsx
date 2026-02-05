import { Percolation } from '../algorithms/Percolation'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Collapse,
  IconButton,
} from '@mui/material'
import { Stack } from '@mui/system'
import { useState, useRef } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RefreshIcon from '@mui/icons-material/Refresh'
import InfoIcon from '@mui/icons-material/Info'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GitHubIcon from '@mui/icons-material/GitHub'
import './Visualizer.css'

const Visualizer = () => {
  const [gridSize, setGridSize] = useState(100)

  const initializeGrid = (size: number) => {
    const grid = []
    for (let i = 0; i < size; i++) {
      grid[i] = []
      for (let j = 0; j < size; j++) {
        grid[i][j] = false
      }
    }
    return grid
  }

  const [grid, setGrid] = useState(initializeGrid(gridSize))
  const [resetKey, setResetKey] = useState(0)
  const [openCount, setOpenCount] = useState(0)
  const [showAlgorithmInfo, setShowAlgorithmInfo] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [trials, setTrials] = useState(0)
  const [meanThreshold, setMeanThreshold] = useState(0)
  const [stddev, setStddev] = useState(0)
  const shouldStopSimulation = useRef(false)
  const thresholds = useRef<number[]>([])
  const percolationOpenSite = useRef<
    ((row: number, col: number) => void) | null
  >(null)
  const checkPercolation = useRef<(() => boolean) | null>(null)

  const runSimulation = async () => {
    if (
      isSimulating ||
      !percolationOpenSite.current ||
      !checkPercolation.current
    )
      return

    setIsSimulating(true)
    shouldStopSimulation.current = false
    thresholds.current = []
    setTrials(0)
    setMeanThreshold(0)
    setStddev(0)

    // Run trials continuously until stopped
    while (!shouldStopSimulation.current) {
      // Reset grid for new trial
      setGrid(initializeGrid(gridSize))
      setResetKey((prev) => prev + 1)
      setOpenCount(0)

      // Slow down simulation as mean approaches 0.5
      const currentMean = meanThreshold
      const delayBetweenTrials = currentMean >= 0.5 ? 500 : 100

      await new Promise((resolve) => setTimeout(resolve, delayBetweenTrials))

      // Get all possible sites
      const sites: [number, number][] = []
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          sites.push([i, j])
        }
      }

      // Shuffle array (Fisher-Yates algorithm)
      for (let i = sites.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[sites[i], sites[j]] = [sites[j], sites[i]]
      }

      let openSites = 0
      let updateCounter = 0
      const updateInterval = 50 // Update visual every 50 sites

      // Open sites until percolation
      for (const [row, col] of sites) {
        if (shouldStopSimulation.current) break

        if (percolationOpenSite.current) {
          percolationOpenSite.current(row, col)
          openSites++
          updateCounter++

          // Update count periodically, not every single site
          if (updateCounter >= updateInterval) {
            setOpenCount(openSites)
            updateCounter = 0
            // Give React time to render
            await new Promise((resolve) => setTimeout(resolve, 0))
          }
        }

        // Check if system percolates
        if (checkPercolation.current && checkPercolation.current()) {
          // Final count update
          setOpenCount(openSites)

          // Calculate threshold for this trial
          const threshold = openSites / (gridSize * gridSize)
          thresholds.current.push(threshold)

          // Update statistics
          const n = thresholds.current.length
          const mean = thresholds.current.reduce((a, b) => a + b, 0) / n

          let variance = 0
          if (n > 1) {
            variance =
              thresholds.current.reduce(
                (sum, val) => sum + Math.pow(val - mean, 2),
                0,
              ) /
              (n - 1)
          }
          const std = Math.sqrt(variance)

          setTrials(n)
          setMeanThreshold(mean)
          setStddev(std)

          // Delay to show percolation result
          await new Promise((resolve) => setTimeout(resolve, 300))
          break
        }
      }

      if (shouldStopSimulation.current) break
    }

    setIsSimulating(false)
  }

  const stopSimulation = () => {
    shouldStopSimulation.current = true
    setIsSimulating(false)
  }

  const resetGrid = () => {
    if (isSimulating) return
    setGrid(initializeGrid(gridSize))
    setResetKey((prev) => prev + 1)
    setOpenCount(0)
    setTrials(0)
    setMeanThreshold(0)
    setStddev(0)
    thresholds.current = []
  }

  const changeGridSize = (size: number) => {
    if (isSimulating) return
    setGridSize(size)
    setGrid(initializeGrid(size))
    setResetKey((prev) => prev + 1)
    setOpenCount(0)
    setTrials(0)
    setMeanThreshold(0)
    setStddev(0)
    thresholds.current = []
  }

  return (
    <Box className='visualizer-container'>
      <Card className='control-card' elevation={8}>
        <CardContent>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            className='title'
          >
            Percolation Visualization
          </Typography>
          <Typography variant='body1' color='text.secondary' paragraph>
            Demonstrates the percolation problem using Weighted Quick
            Union-Find. Click squares to open sites—when enough sites connect,
            fluid percolates from top to bottom. Run simulations to estimate the
            percolation threshold using Monte Carlo methods.
          </Typography>

          <Stack spacing={2} direction='row' className='button-group'>
            {!isSimulating ? (
              <Button
                variant='contained'
                size='large'
                startIcon={<PlayArrowIcon />}
                onClick={() => runSimulation()}
                className='simulate-btn'
              >
                Simulate
              </Button>
            ) : (
              <Button
                variant='contained'
                size='large'
                onClick={stopSimulation}
                sx={{
                  background: '#ef5350 !important',
                  color: 'white !important',
                  padding: '10px 30px !important',
                  fontWeight: 600,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    background: '#d32f2f !important',
                  },
                }}
              >
                Stop Simulation
              </Button>
            )}
          </Stack>

          <Box className='stats-container'>
            <Chip
              label={`Grid Size: ${gridSize}×${gridSize}`}
              color='primary'
            />
            <Chip label={`Open Sites: ${openCount}`} color='secondary' />
            {trials > 0 && (
              <>
                <Chip
                  label={`Trials: ${trials}`}
                  sx={{
                    background: '#667eea !important',
                    color: 'white !important',
                  }}
                />
                <Chip
                  label={`Mean: ${meanThreshold.toFixed(4)}`}
                  sx={{
                    background: '#66bb6a !important',
                    color: 'white !important',
                  }}
                />
                <Chip
                  label={`Stddev: ${stddev.toFixed(4)}`}
                  sx={{
                    background: '#ffa726 !important',
                    color: 'white !important',
                  }}
                />
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      <Box className='grid-container'>
        <Percolation
          key={resetKey}
          data={{ grid, num: gridSize }}
          onReset={resetGrid}
          onOpenSite={(openFn) => {
            percolationOpenSite.current = openFn
          }}
          onPercolationCheck={(checkFn) => {
            checkPercolation.current = checkFn
          }}
        />
      </Box>

      <Card className='info-card' elevation={8}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon sx={{ color: '#667eea' }} />
              <Typography variant='h5' fontWeight={600} className='title'>
                Algorithm Efficiency
              </Typography>
            </Box>
            <IconButton
              onClick={() => setShowAlgorithmInfo(!showAlgorithmInfo)}
              sx={{
                transform: showAlgorithmInfo
                  ? 'rotate(180deg)'
                  : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          <Collapse in={showAlgorithmInfo}>
            <Box sx={{ marginTop: 3 }}>
              <Typography
                variant='h6'
                fontWeight={600}
                gutterBottom
                sx={{ color: '#667eea' }}
              >
                Weighted Quick Union Find
              </Typography>

              <Box className='complexity-section'>
                <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                  ⚡ Time Complexity
                </Typography>
                <Box className='complexity-item'>
                  <Chip
                    label='Constructor'
                    size='small'
                    className='operation-chip'
                  />
                  <Typography variant='body2' color='text.secondary'>
                    <strong>O(n²)</strong> - Initializes n×n grid plus 2 virtual
                    nodes
                  </Typography>
                </Box>
                <Box className='complexity-item'>
                  <Chip label='Find' size='small' className='operation-chip' />
                  <Typography variant='body2' color='text.secondary'>
                    <strong>O(log n)</strong> average case
                  </Typography>
                </Box>
                <Box className='complexity-item'>
                  <Chip label='Union' size='small' className='operation-chip' />
                  <Typography variant='body2' color='text.secondary'>
                    <strong>O(log n)</strong> average case (calls find twice)
                  </Typography>
                </Box>
                <Box className='complexity-item'>
                  <Chip
                    label='Connected'
                    size='small'
                    className='operation-chip'
                  />
                  <Typography variant='body2' color='text.secondary'>
                    <strong>O(log n)</strong> average case (calls find twice)
                  </Typography>
                </Box>
              </Box>

              <Box className='complexity-section'>
                <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                  💾 Space Complexity
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  <strong>O(n²)</strong> - Stores parent and size arrays for
                  n×n+2 nodes
                </Typography>
              </Box>

              <Box className='complexity-section'>
                <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                  🎯 Why It's Efficient
                </Typography>
                <Box component='ul' sx={{ margin: 0, paddingLeft: 2 }}>
                  <li>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Union by Size:</strong> Always attaches smaller
                      tree under larger one, keeping tree height logarithmic
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Near-constant operations:</strong> For an n×n
                      grid, each union/find is logarithmic
                    </Typography>
                  </li>
                  <li>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Prevents degenerate cases:</strong> Without
                      weighting, trees could become linear (O(n) operations)
                    </Typography>
                  </li>
                </Box>
              </Box>

              <Box className='info-footer'>
                <Typography variant='body2' color='text.secondary'>
                  For a 10×10 grid (100 sites), you're looking at ~7 operations
                  per union/find in the worst case!
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: 'center', padding: 3 }}>
        <Button
          href='https://github.com/mjHarakka/js-percolation'
          target='_blank'
          startIcon={<GitHubIcon />}
          sx={{
            color: 'white',
            textTransform: 'none',
            fontSize: '16px',
          }}
        >
          View on GitHub
        </Button>
      </Box>
    </Box>
  )
}

export default Visualizer
