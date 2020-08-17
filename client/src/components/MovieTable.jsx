import React, { useContext, useState } from 'react'
import { Link as Linkrr } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core'

// context imports
import { movieContext } from '../store/MovieContext'

// helpers
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

function descendingComparator(a, b, orderBy) {
  const aa = orderBy === 'released_on' ? new Date(a[orderBy]) : a[orderBy]
  const bb = orderBy === 'released_on' ? new Date(b[orderBy]) : b[orderBy]

  if (bb < aa) {
    return -1
  }
  if (bb > aa) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Movie Title' },
  { id: 'genre', numeric: false, disablePadding: false, label: 'Genre' },
  { id: 'rated', numeric: false, disablePadding: false, label: 'Rated' },
  {
    id: 'released_on',
    numeric: true,
    disablePadding: false,
    label: 'Release Date',
  },
]

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" colSpan="2">
          Details
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default function MovieTable() {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('released_on')
  const { movieList } = useContext(movieContext)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="movie table">
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(movieList, getComparator(order, orderBy)).map((movie) => (
            <TableRow key={movie.pk}>
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.genre}</TableCell>
              <TableCell>{movie.rated}</TableCell>
              <TableCell align="right">{movie.released_on}</TableCell>
              <TableCell>
                <Link component={Linkrr} to={`/movie/${movie.pk}`}>
                  View
                </Link>
              </TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
