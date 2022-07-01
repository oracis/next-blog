import "reflect-metadata";
import { Connection, getConnection, createConnection } from "typeorm";
import { User, UserAuth, Article, Comment } from "./entity";

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const username = process.env.DATABASE_USER_NAME;
const password = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;

let connectionReadayPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadayPromise) {
    connectionReadayPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (e) {
        console.error(e);
      }

      const connection = await createConnection({
        type: "mysql",
        host,
        port,
        username,
        password,
        database: dbName,
        entities: [User, UserAuth, Article, Comment],
        synchronize: false,
        logging: true,
      });
      return connection;
    })();
  }
  return connectionReadayPromise;
};
