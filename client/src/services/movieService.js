import axios from 'axios'

class MovieService {
  constructor() {
    this.baseUrl = 'http://localhost:8000/'
  }
  // get movies list
  async getMoviesList() {
    const response = await axios.get(`${this.baseUrl}movies/api/`)
    return response.data
  }
  // get movie detail
  async getMovieDetail(movieID) {
    const response = await axios.get(`${this.baseUrl}movies/api/${movieID}`)
    return response.data
  }
  // add rating
  async postRating(ratingData) {
    await axios.post(`${this.baseUrl}movies/api/ratings/`, ratingData)
  }
}

const movieService = new MovieService()

export default movieService
