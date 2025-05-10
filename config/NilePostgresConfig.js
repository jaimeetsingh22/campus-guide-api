import { Client } from "node-postgres";
import { config } from "dotenv";
config();
export const client = new Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: "us-west-2.db.thenile.dev",
  port: 5432,
  database: "campus_guid_prod",
});
