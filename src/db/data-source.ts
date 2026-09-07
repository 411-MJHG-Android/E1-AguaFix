import { DataSource, DataSourceOptions } from "typeorm";
import { envs } from "../config/envs";
import { WaterReport } from "../reports/entity/report.entity";
import { User } from "../auth/entities/user.entity";

export const dataSourceOptions : DataSourceOptions = {
    host: envs.DB_HOST,
    type: 'postgres',
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    port: envs.DB_PORT,
    entities: [WaterReport, User],
    synchronize: false,
    migrations: ['dist/db/migrations/[0-9]*-*.js']
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;