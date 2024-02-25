import { MyMoviesDao } from "../models/moviesdao";
import { Movie } from "../models/movies";

export interface MovieController {
  getMovieName(id: number): Promise<string|null>;
  getMovie(id: number): Promise<Movie>;
  getAllMovies(skip:number, limit:number): Promise<Movie[]>;
  saveMovie(movie: Movie): Promise<void>;
}

export class MovieHandler implements MovieController {
  private movieDao: MyMoviesDao;

  constructor(dao: MyMoviesDao) {
    this.movieDao = dao;
  }

  async getMovieName(id: number): Promise<string | null> {
    const name = await this.movieDao.getMovieNameByID(id);
      if (name === null) {
        throw new Error(`Movie Name with ID ${id} not found`);
    }
    return name;
}
    async getMovie(id: number): Promise<Movie> {
        const movie = await this.movieDao.getMovieByID(id);
        if (movie === null) {
            throw new Error(`Movie with ID ${id} not found`);
        }
        return movie;
    }

  async getAllMovies(skip:number, limit:number) {
    return this.movieDao.getAllMovies(skip, limit);
  }

  async saveMovie(movie: Movie) {
    return this.movieDao.saveMovie(movie);
  }
}