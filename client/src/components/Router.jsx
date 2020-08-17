import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import MovieDetail from './MovieDetail'
import MovieTable from './MovieTable'

export default function Router() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MovieTable />
        </Route>
        <Route path="/movie/:id">
          <MovieDetail />
        </Route>
      </Switch>
    </Router>
  )
}
