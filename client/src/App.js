import React, { useContext, useEffect, useState } from 'react'
import { Paper } from '@material-ui/core'
import { IconButton, Tooltip } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'

import { OptionsContext } from './store/Theme'
import movieService from './services/movieService'
import MovieTable from './components/MovieTable'

function App() {
  const [movieList, setMovieList] = useState([])
  const { setThemeState } = useContext(OptionsContext)
  const theme = useTheme()

  const handleThemeChange = () => {
    const newThemeType =
      theme.palette.type === 'light' ? { type: 'dark' } : { type: 'light' }
    setThemeState(newThemeType)
  }

  useEffect(() => {
    if (movieList.length === 0) {
      movieService.getMoviesList().then((res) => {
        console.log(res)
        setMovieList(res)
      })
    }
  })

  return (
    <Paper>
      <header className="App-header">Fancy Header</header>
      <Tooltip title="Toggle light/dark theme." aria-label="Theme toggle.">
        <IconButton color="inherit" onClick={handleThemeChange}>
          {theme.palette.type === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
      {movieList.length !== 0 && <MovieTable movieList={movieList} />}
    </Paper>
  )
}

export default App
