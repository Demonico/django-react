import React, { useContext } from 'react'
import { Paper } from '@material-ui/core'
import { IconButton, Tooltip } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'

import { OptionsContext } from './store/Theme'

function App() {
  const { setThemeState } = useContext(OptionsContext)
  const theme = useTheme()

  const handleThemeChange = () => {
    const newThemeType =
      theme.palette.type === 'light' ? { type: 'dark' } : { type: 'light' }
    setThemeState(newThemeType)
  }

  return (
    <Paper>
      <header className="App-header">Fancy Header</header>
      <Tooltip title="Toggle light/dark theme." aria-label="Theme toggle.">
        <IconButton color="inherit" onClick={handleThemeChange}>
          {theme.palette.type === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Paper>
  )
}

export default App
