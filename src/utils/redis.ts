import { url } from "inspector";
import { createClient } from "redis";

export const client = createClient({
  url: "redis://127.0.0.1:6379",
 
  socket: {
    host: "http://127.0.0.1",
    port: 6379,
  },
});

export class Redis {
  static async connectToRedis() {
    // this.client.on('error', (err) => console.log('Redis Client Error'));
    await client
      .connect()
      .then(() => {
        console.log("connected to Redis");
        this.setValue("me", "coding");
        this.getValue("me");
      })
      .catch((e) => {
        throw e;
      });
  }

  static async setValue(key: string, value: string, expires_at?) {
    try {
      let options: any = {};
      if (expires_at) {
         options = {
          EX: expires_at,
        };
      }
      await client.set(key, value, options);
      return;
    } catch (e) {
      console.log(e);
      throw "Sever not connected please try again...";
    }
  }

  static async getValue(key) {
    try {
      const value = await client.get(key);
      return value;
    } catch (e) {
      console.log(e);
      throw "User Does not exists";
    }
  }

  static async deleteValue(key) {
    try {
      await client.del(key);
    } catch (e) {
      console.log(e);
      throw "User Does not exists";
    }
  }
}
