declare namespace NodeJS {
  export interface ProcessEnv {
    MYSQL_DB_HOST?: string;
    MYSQL_DB_USERNAME?: string;
    MYSQL_DB_PASSWORD?: string;
    MYSQL_DB_PORT?: string;
    MYSQL_DB_NAME?: string;
    PORT?: string;
    REDIS_DB_PORT?: string;
    REDIS_DB_HOST?: string;
    REDIS_DB_URL?: string;
    COOKIE_SECRET?: string;
    ENVIRONMENT: Environment;
  }
  export type Environment = 'DEVELOPMENT' | 'PRODUCTION' | 'STAGING';
}
