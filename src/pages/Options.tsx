import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material'
import { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import GridOnIcon from '@mui/icons-material/GridOn'
import SpeedIcon from '@mui/icons-material/Speed'

const Options = () => {
  const [gridSize, setGridSize] = useState(10)
  const [animationSpeed, setAnimationSpeed] = useState(50)
  const [showStats, setShowStats] = useState(true)

  const handleGridSizeChange = (event: Event, newValue: number | number[]) => {
    setGridSize(newValue as number)
  }

  const handleAnimationSpeedChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setAnimationSpeed(newValue as number)
  }

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          margin: '0 auto',
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 3,
            }}
          >
            <TuneIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography
              variant='h3'
              component='h1'
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Settings
            </Typography>
          </Box>

          <Alert severity='info' sx={{ marginBottom: 4 }}>
            Customize your percolation visualization experience. Changes will
            apply to new grids.
          </Alert>

          <Box sx={{ marginBottom: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: 2,
              }}
            >
              <GridOnIcon color='primary' />
              <FormLabel sx={{ fontSize: '18px', fontWeight: 600 }}>
                Grid Size
              </FormLabel>
            </Box>
            <FormControl fullWidth>
              <Slider
                value={gridSize}
                onChange={handleGridSizeChange}
                min={5}
                max={50}
                step={5}
                marks={[
                  { value: 5, label: '5×5' },
                  { value: 10, label: '10×10' },
                  { value: 20, label: '20×20' },
                  { value: 30, label: '30×30' },
                  { value: 40, label: '40×40' },
                  { value: 50, label: '50×50' },
                ]}
                valueLabelDisplay='auto'
                valueLabelFormat={(value) => `${value}×${value}`}
                sx={{
                  '& .MuiSlider-thumb': {
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  },
                  '& .MuiSlider-track': {
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  },
                }}
              />
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ marginTop: 2 }}
              >
                Current selection:{' '}
                <strong>
                  {gridSize}×{gridSize}
                </strong>{' '}
                grid ({gridSize * gridSize} total sites)
              </Typography>
            </FormControl>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ marginBottom: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: 2,
              }}
            >
              <SpeedIcon color='primary' />
              <FormLabel sx={{ fontSize: '18px', fontWeight: 600 }}>
                Animation Speed
              </FormLabel>
            </Box>
            <FormControl fullWidth>
              <Slider
                value={animationSpeed}
                onChange={handleAnimationSpeedChange}
                min={10}
                max={100}
                step={10}
                marks={[
                  { value: 10, label: 'Slow' },
                  { value: 50, label: 'Normal' },
                  { value: 100, label: 'Fast' },
                ]}
                valueLabelDisplay='auto'
                sx={{
                  '& .MuiSlider-thumb': {
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  },
                  '& .MuiSlider-track': {
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  },
                }}
              />
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ marginTop: 2 }}
              >
                Controls the speed of simulation animations
              </Typography>
            </FormControl>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          <Box>
            <FormLabel
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                marginBottom: 2,
                display: 'block',
              }}
            >
              Display Options
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={showStats}
                  onChange={(e) => setShowStats(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#667eea',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#667eea',
                    },
                  }}
                />
              }
              label='Show statistics (grid size, open sites)'
            />
          </Box>

          <Box
            sx={{
              marginTop: 4,
              padding: 3,
              background:
                'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 2,
            }}
          >
            <Typography variant='body2' color='text.secondary'>
              💡 <strong>Tip:</strong> Larger grid sizes provide more accurate
              percolation threshold estimates but may slow down the
              visualization. For optimal performance, stick to grids under
              30×30.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Options
