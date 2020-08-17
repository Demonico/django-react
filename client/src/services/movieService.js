import axios from 'axios'

class MovieService {
  constructor() {
    this.baseUrl = 'http://localhost:8000/movies/api/'
  }
  // get movies list
  async getMoviesList() {
    const response = await axios.get(this.baseUrl)
    return response.data
  }
  // get movie detail
  async getMovieDetail(movieID) {
    const response = await axios.get(`${this.baseUrl}${movieID}`)
    return response.data
  }
  // add rating
}

const movieService = new MovieService()

export default movieService
