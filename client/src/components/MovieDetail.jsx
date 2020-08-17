import React, { useContext, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

// context imports
import { movieContext } from '../store/MovieContext'

export default function MovieDetail() {
  const { movieID } = useParams()
  const { movieDetails = {}, selectedMovie, setSelectedMovie } = useContext(
    movieContext
  )

  useEffect(() => {
    if (movieID !== selectedMovie) {
      setSelectedMovie(movieID)
    }
  })

  if (Object.keys(movieDetails).length === 0) return <Fragment />

  return (
    <Box>
      <Box textAlign="center" component="h2">
        {movieDetails.title}
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="movie details">
          <TableBody>
            <TableRow>
              <TableCell align="right">Director</TableCell>
              <TableCell>{movieDetails.director}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Genre</TableCell>
              <TableCell>{movieDetails.genre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Rated</TableCell>
              <TableCell>{movieDetails.rated}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Release Date</TableCell>
              <TableCell>{movieDetails.released_on}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={2} p={2}>
        {movieDetails.plot}
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="movie details">
          <TableHead>
            <TableRow>
              <TableCell>Rating</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieDetails.ratings.map((rate) => (
              <TableRow key={rate.pk}>
                <TableCell>{rate.rating}</TableCell>
                <TableCell>{rate.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const obj = {
  pk: 1,
  title: 'Guardians of the Galaxy Vol. 2',
  director: 'James Gunn',
  genre: 'Action, Adventure, Comedy, Sci-Fi',
  rated: 'PG-13',
  released_on: '2017-05-05',
  year: 2017,
  ratings: [],
  plot: 'James Gunn, ',
}
