import { MyMoviesDao , MovieDao } from "../models/moviesdao";
import { MovieController , MovieHandler } from "./movieController";

export interface MovieModule {
  movieDao: MyMoviesDao;
  movieController: MovieController;
}

export const movieDao = new MovieDao();
export const movieController = new MovieHandler(movieDao);

export const MovieModule = {
    movieDao,
    movieController
};