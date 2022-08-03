import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
/**
 * Uses env params to configure TypeORM database library
 */
const config: PostgresConnectionOptions = {
    database: process.env.POSTGRES_DB,
    entities: [
      "dist/app/entities/*{.ts,.js}",
    ],
    extra: { max: 5, min: 2 }, // connection pool
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    synchronize: false,
    logging: true,
    type: "postgres",
    username: process.env.POSTGRES_USER,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/migrations/*.js"],
    cli: {
      migrationsDir: "src/migrations"
    }
};export default config;