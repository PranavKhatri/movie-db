import { Movie } from "./movies";
import { db, SortDirection } from "../services/db/db";


const moviesDatabase = "movies";
const DEFAULT_MOVIE_ID = 1;

// Think of a Dao as the interface between your logic and the database
// In Mongoose terms a Dao is a Model. It is what will store and fetch our data.
export interface MyMoviesDao {
  saveMovie(movie: Movie): Promise<void>;
  getMovie(name: string): Promise<Movie|null>;
  getMovieByID(id: number): Promise<Movie|null>;
  getMovieNameByID(id: number) : Promise<string|null>;
  getAllMovies(skip:number, limit:number): Promise<Movie[]>;
}

class MovieDaoHelpers{
  async getLatestMovieID(): Promise<number>{

    const mysort : { [key: string]: SortDirection } = {id : -1};
    const latestMovie: Movie | null  = await db.collection<Movie>(moviesDatabase).findOne({}, { sort: mysort });
    
    if(!latestMovie || latestMovie.id === undefined){
        return DEFAULT_MOVIE_ID;
    }
    return latestMovie.id ;
}

    validate(movie:Movie):Movie{

        if (movie.cast === null || movie.cast === undefined || movie.cast.length === 0) {
            movie.cast = [];
        }
        if (typeof movie.year === "string") {
            const parsedYear = parseInt(movie.year);
            if (!isNaN(parsedYear)) {
                movie.year = parsedYear;
            } else {
              throw new Error("Invalid year format");
            }
        }
        return movie;
    }
}
export class MovieDao extends MovieDaoHelpers implements MyMoviesDao  {
  async saveMovie(movie: Movie) {
    const latestMovieId = await this.getLatestMovieID() + 1;
    movie.id = latestMovieId;
    movie =  this.validate(movie);
    await db.collection<Movie>(moviesDatabase).insertOne(movie);
    return;
  }

  async getMovie(name: string): Promise<Movie|null> {
    const result = await db.collection<Movie>(moviesDatabase).findOne({ name });
    return result;
    }

    async getMovieByID(id: number): Promise<Movie|null> {
        const result = await db.collection<Movie>(moviesDatabase).findOne({ id });
        return result;
    }

    async getMovieNameByID(id: number): Promise<string|null> {
        const result = await db.collection<Movie>(moviesDatabase).findOne({ id });
        return result?.name ?? null;
    }
  async getAllMovies(skip:number, limit:number) {
    const cursor = await db.collection<Movie>(moviesDatabase)
                    .find({})
                    .skip(skip)
                    .limit(limit);
    const results = await cursor.toArray();
    return results;
  }
}