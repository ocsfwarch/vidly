import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from './common/pagination'
import ListGroup from './common/listGroup'
import { paginate } from '../utils/paginate'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: ""
  };

  componentDidMount() {
    const genres = [{name: 'All Genres'}, ...getGenres()]
    this.setState({movies: getMovies(), genres, selectedGenre: genres[0]})
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter(({ _id }) => _id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({currentPage: page})
  }

  handleGenreSelect = (genre) => {
    console.log(`handleGenreSelect = ${genre.name}`)
    this.setState({selectedGenre: genre, currentPage: 1})
  }

  render() {
    const { length: totalMovies } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies: allMovies} = this.state;

    const filteredMovies = selectedGenre && selectedGenre._id 
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id) 
      : allMovies
    const movies = paginate(filteredMovies, currentPage, pageSize)

    if (totalMovies === 0) {
      return <p>There are no movies in the database</p>;
    }
    return (
      <div className="row">
        <div className="col-3">            
          <ListGroup 
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect} 
            />
        </div>
        <div className="col">
          <p>Showing {filteredMovies.length} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination 
            itemsCount={filteredMovies.length} 
            pageSize={this.state.pageSize} 
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange} >
          </Pagination>        
        </div>
      </div>
    );
  }
}

export default Movies;
