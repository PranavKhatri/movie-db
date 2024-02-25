import express from "express";
import { MovieRouter } from "./routes/movieRoutes";
import { MovieModule } from "./routes/index";

export const MovieApp = (movieModule: MovieModule) => {
  const app = express();
  app.use(express.json());

  const movieRouter = MovieRouter(movieModule.movieController, movieModule.movieDao);
  app.use(movieRouter);

  return app;
};