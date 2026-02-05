import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Link,
} from '@mui/material'
import CodeIcon from '@mui/icons-material/Code'
import SchoolIcon from '@mui/icons-material/School'
import GitHubIcon from '@mui/icons-material/GitHub'

const About = () => {
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
          maxWidth: 900,
          margin: '0 auto',
          borderRadius: 4,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant='h3'
            component='h1'
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            About This Project
          </Typography>

          <Box sx={{ marginBottom: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: 2,
              }}
            >
              <SchoolIcon color='primary' />
              <Typography variant='h5' component='h2' fontWeight={600}>
                What is Percolation?
              </Typography>
            </Box>
            <Typography variant='body1' paragraph color='text.secondary'>
              The percolation problem is a classic computational model used to
              study phase transitions and connectivity in systems. Given a
              composite system made up of randomly distributed insulating and
              metallic materials, what fraction of the materials need to be
              metallic so that the composite system is an electrical conductor?
            </Typography>
            <Typography variant='body1' paragraph color='text.secondary'>
              In this visualization, we model percolation using an n-by-n grid
              of sites. Each site is either open (white/gray) or blocked. A full
              site is an open site that can be connected to an open site in the
              top row via a chain of neighboring open sites. The system
              percolates if there is a full site in the bottom row.
            </Typography>
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
              <CodeIcon color='primary' />
              <Typography variant='h5' component='h2' fontWeight={600}>
                The Algorithm
              </Typography>
            </Box>
            <Typography variant='body1' paragraph color='text.secondary'>
              This implementation uses the{' '}
              <strong>Weighted Quick Union Find</strong> algorithm to
              efficiently determine connectivity between sites. The algorithm
              maintains a forest of trees representing disjoint sets, using path
              compression and union-by-size optimizations to achieve
              near-constant time operations.
            </Typography>
            <Box
              sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 2 }}
            >
              <Chip label='TypeScript' color='primary' variant='outlined' />
              <Chip label='React' color='primary' variant='outlined' />
              <Chip label='Material-UI' color='primary' variant='outlined' />
              <Chip label='Union-Find' color='secondary' variant='outlined' />
            </Box>
          </Box>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ marginBottom: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                marginBottom: 2,
              }}
            >
              <GitHubIcon color='primary' />
              <Typography variant='h5' component='h2' fontWeight={600}>
                Resources
              </Typography>
            </Box>
            <Typography variant='body1' paragraph color='text.secondary'>
              This project is based on the Princeton University Algorithms
              course assignment. The original algorithm specification can be
              found in the resources below:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href='https://algs4.cs.princeton.edu/15uf/WeightedQuickUnionUF.java.html'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ fontSize: '14px' }}
              >
                → Original Java Implementation
              </Link>
              <Link
                href='https://coursera.cs.princeton.edu/algs4/assignments/percolation/specification.php'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ fontSize: '14px' }}
              >
                → Percolation Assignment Specification
              </Link>
              <Link
                href='https://github.com/mjHarakka/js-percolation'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ fontSize: '14px' }}
              >
                → View Source Code on GitHub
              </Link>
            </Box>
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
            <Typography
              variant='body2'
              color='text.secondary'
              textAlign='center'
            >
              Click on any square in the grid to open a site and explore how the
              system percolates!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default About
