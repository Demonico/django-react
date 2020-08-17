import React, { useEffect, useState } from 'react'

import movieService from '../services/movieService'

export const movieContext = React.createContext({})

export default function MovieProvider({ children }) {
  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [movieDetails, setMovieDetails] = useState({})

  useEffect(() => {
    if (movieList.length === 0) {
      movieService.getMoviesList().then((res) => {
        // console.log(res)
        setMovieList(res)
      })
    }
  })

  useEffect(() => {
    if (selectedMovie !== '') {
      movieService.getMovieDetail(selectedMovie).then((res) => {
        setMovieDetails(res)
      })
    }
  }, [selectedMovie])

  const postRating = (ratingData) => {
    movieService.postRating(ratingData)
  }

  return (
    <movieContext.Provider
      value={{
        movieList,
        setMovieList,
        selectedMovie,
        setSelectedMovie,
        movieDetails,
        setMovieDetails,
        postRating,
      }}
    >
      {children}
    </movieContext.Provider>
  )
}
