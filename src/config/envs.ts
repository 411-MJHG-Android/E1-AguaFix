import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    DB_NAME: env.get('DB_NAME').required().asString(),
    DB_HOST: env.get('DB_HOST').required().asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),
    DB_USER: env.get('DB_USER').required().asString(),
    DB_PORT: env.get('DB_PORT').required().asPortNumber(),

    MAIL_HOST: env.get('MAIL_HOST').required().asString(),
  MAIL_PORT: env.get('MAIL_PORT').default(587).asPortNumber(),
  MAIL_USER: env.get('MAIL_USER').required().asString(),
  MAIL_PASS: env.get('MAIL_PASS').required().asString(),
  MAIL_FROM: env.get('MAIL_FROM').required().asString(),
  MAINTENANCE_CREW_EMAIL: env.get('MAINTENANCE_CREW_EMAIL').required().asString(),
};