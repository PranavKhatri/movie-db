import { MovieApp } from "./src/app";
import { startServer } from "./src/services/db/db";
import { MovieModule } from "./src/routes/index";

// Connect to mongodb
startServer();

const port = process.env.PORT || 3000;

const app = MovieApp(MovieModule);

app.listen(port, () => {
  console.log("Running on port: ", port);
  console.log("--------------------------");
});