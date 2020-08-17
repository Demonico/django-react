import React, { useContext } from 'react'
import { Paper } from '@material-ui/core'
import { Box, Container, IconButton, Tooltip } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'

import { OptionsContext } from './store/Theme'
import MovieProvider from './store/MovieContext'

import Routes from './components/Routes'

function App() {
  const { setThemeState } = useContext(OptionsContext)
  const theme = useTheme()

  const handleThemeChange = () => {
    const newThemeType =
      theme.palette.type === 'light' ? { type: 'dark' } : { type: 'light' }
    setThemeState(newThemeType)
  }

  return (
    <Container maxWidth="lg">
      <Box p={2}>
        <Paper>
          <Box p={2}>
            <header className="App-header">Fancy Header</header>
            <Tooltip
              title="Toggle light/dark theme."
              aria-label="Theme toggle."
            >
              <IconButton color="inherit" onClick={handleThemeChange}>
                {theme.palette.type === 'light' ? (
                  <Brightness4 />
                ) : (
                  <Brightness7 />
                )}
              </IconButton>
            </Tooltip>
            <MovieProvider>
              <Routes />
            </MovieProvider>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
