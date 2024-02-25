import { MongoClient, Db, SortDirection } from "mongodb";
const url = "mongodb://localhost:27017";
// Database Name
const defaultDbname = "myproject";

// Create a new MongoClient
const client = new MongoClient(url);

let db : Db;

export const startServer = async (dbName: string = defaultDbname) => {
  // Use connect method to connect to the Server
  const conn = await client.connect();
  db = conn.db(dbName);
  return client;
};

export { db, SortDirection };