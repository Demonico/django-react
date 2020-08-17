import axios from 'axios'

class MovieService {
  // get movies list
  async getMoviesList() {
    const response = await axios.get('http://localhost:8000/movies/api/')
    return response.data
  }
  // get movie detail
  // add rating
}

const movieService = new MovieService()

export default movieService
