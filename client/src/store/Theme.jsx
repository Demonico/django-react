import React, { useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { green, purple } from '@material-ui/core/colors'

export const OptionsContext = React.createContext({ type: 'dark' })

const themeBase = {
  palette: {
    primary: green,
    secondary: purple,
    type: 'dark',
  },
}

export default function Theme({ children }) {
  const [themeState, setThemeState] = useState({ type: 'dark' })

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        ...themeBase,
        palette: { ...themeBase.palette, type: themeState.type },
      }),
    [themeState]
  )

  return (
    <ThemeProvider theme={theme}>
      <OptionsContext.Provider value={{ setThemeState }}>
        {children}
      </OptionsContext.Provider>
    </ThemeProvider>
  )
}
