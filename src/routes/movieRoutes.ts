import { Router } from "express";
import { MovieController } from "./movieController";
import { MyMoviesDao } from "../models/moviesdao";
import { Movie } from "../models/movies";
import { getPagination } from "../services/pagination";

export const MovieRouter = (
  movieController: MovieController,
  movieDao: MyMoviesDao
) => {
  const moviesRouter = Router();

  moviesRouter.get("/movies", async (req, res) => {
    try {
        console.log(req.query);
      
        const { page, size } = req.query;
        console.log(page);

       
          let pageNumber = 0;
          let pageSize = 0;
          if(page === undefined){
            pageNumber = 0;
          }else{
            pageNumber = +page;
          }

          if(size === undefined){
            pageSize = 0;
          }else{
            pageSize = +size;
          }
          
          
          
          // Check if conversion was successful and not NaN
          if (!isNaN(pageNumber) && !isNaN(pageSize)) {
              const { skip, limit } = getPagination(pageNumber, pageSize);
              // console.log(skip, limit);
              const movies = await movieController.getAllMovies(skip,limit );
              res.status(200).json(movies);
          }
      

    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ error: e.message });
          } else {
            res.status(500).json({ error: "An unknown error occurred" });
          }
    }
  });

  moviesRouter.get("/movie/:id", async (req, res) => {
    try {
        const movieId = Number(req.params.id);
      const movie = await movieController.getMovie(movieId);
      res.status(200).json(movie);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ error: e.message });
          } else {
            res.status(500).json({ error: "An unknown error occurred" });
          }
    }
  });

  moviesRouter.get("/moviename/:id", async (req, res) => {
    try {
        const movieId = Number(req.params.id);
      const movie = await movieController.getMovieName(movieId);
      res.status(200).json(movie);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ error: e.message });
          } else {
            res.status(500).json({ error: "An unknown error occurred" });
          }
    }
  });


  moviesRouter.post("/movie", async (req, res) => {
    try {


        const { name, year, cast }  = req.body;
        console.log(req);
        const newMovie = Movie(name, year, cast);
        await movieDao.saveMovie(newMovie);
        res.status(200).json({ message: "Movie Added!" });
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json({ error: e.message });
          } else {
            res.status(500).json({ error: "An unknown error occurred" });
          }
    }
  });

  return moviesRouter;
}
