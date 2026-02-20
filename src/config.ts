import { registerAs } from "@nestjs/config";

export const config = registerAs("config", () => ({
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV || "local",
  app: {
    name: 'CS3_STORE_APP',
  },
  db: {
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  security: {
    pepper: process.env.SECURITY_PEPPER ?? 'PEPPER_DEFAULT_VALUE',
  },
}));
