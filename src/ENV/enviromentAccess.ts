import { DevENV } from "./DevEnviromentViriable";
import { prodENV } from "./ProdEnviromentVariable";
import { createClient } from "redis";

export const jwt_secret_key = "you to";
export function envVariables() {
  if (process.env.NODE_ENV === "production") {
    return prodENV;
  }
  return DevENV;
}

export const redisOnline = () => {
  const client = createClient({
    password: "<password>",
    socket: {
      host: "redis-14727.c258.us-east-1-4.ec2.redns.redis-cloud.com",
      port: 14727,
    },
  });
};
