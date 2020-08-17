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

  const { ratings } = movieDetails

  return (
    <Box>
      <Box textAlign="center" component="h2" color="primary.main">
        {movieDetails.title}
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="movie details">
          <TableBody>
            <TableRow>
              <TableCell align="right" variant="head">
                Director
              </TableCell>
              <TableCell>{movieDetails.director}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" variant="head">
                Genre
              </TableCell>
              <TableCell>{movieDetails.genre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" variant="head">
                Rated
              </TableCell>
              <TableCell>{movieDetails.rated}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" variant="head">
                Release Date
              </TableCell>
              <TableCell>{movieDetails.released_on}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={2} p={2}>
        {movieDetails.plot}
      </Box>

      {ratings.length > 0 && (
        <Fragment>
          <Box textAlign="center" component="h3" color="secondary.main">
            User Ratings
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
        </Fragment>
      )}
    </Box>
  )
}
