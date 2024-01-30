
import postgres from "postgres";
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import config from '../config.json';

//run first migration to the db
const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
if (!process.env.DB_URL) throw new Error("DB_URL is not set");

const connectionString = process.env.DB_URL;
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);
(async () => {
    try {
      await migrate(db, { migrationsFolder: "drizzle" });
      await sql.end();
    } catch (error) {
      console.error('Error during migration:', error);
    }
  })();
const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router);

const server = http.createServer(app);
const port = Number(process.env.APP_PORT || config.APP_PORT || 8080);
server.listen(port, () => {
    console.info('Server running on port: ' + port);
});
