import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  host: process.env.HOST || "0.0.0.0",
  rcon: {
    host: process.env.RCON_HOST || "localhost",
    port: parseInt(process.env.RCON_PORT || "25575", 10),
    password: process.env.RCON_PASSWORD || "minecraft",
    timeout: parseInt(process.env.RCON_TIMEOUT || "5000", 10),
  },
  auth: {
    enabled: process.env.AUTH_ENABLED !== "false",
    apiKey: process.env.API_KEY || "changeme",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
};
