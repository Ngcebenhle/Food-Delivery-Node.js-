import * as jwt from "jsonwebtoken";
import { envVariables } from "../ENV/enviromentAccess";
import { DevENV } from "../ENV/DevEnviromentViriable";
import * as crypto from "crypto";
import { Redis } from "./redis";

export class Jwt {
    
  static jwtSign(payload, userId, expiresIn: string = "180d") {
    return jwt.sign(payload, DevENV.jwt_secret_key, {
      expiresIn,
      audience: userId,
      issuer: "me@me",
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, DevENV.jwt_secret_key, (err, decoder) => {
        if (err) {
          reject(err);
        } else if (!decoder) {
          reject(new Error("User is not Authorised"));
        } else {
          resolve(decoder);
        }
      });
    });
  }

  static async jwtSignRefresgToken(
    payload,
    userId,
    expiresIn: string = "180d",
    redis_ex : number = 365 * 24 * 60 * 60
  ) {
    // return  jwt.sign(
    //     payload,
    //     DevENV.refresh_jwt_secret_key,
    //     {
    //         expiresIn,
    //         audience: userId,
    //         issuer: 'me@me'
    //     }
    // );

    try {
      const refreshtoken = jwt.sign(payload, DevENV.refresh_jwt_secret_key, {
        expiresIn: expiresIn,
        audience: userId,
        issuer: "me@me",
      });

      // await Redis.setValue(userId.toString(), refreshtoken,redis_ex);
      return refreshtoken;
    } catch (e) {
      throw e;
    }
  }

  static jwtVerifyRefresgToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, DevENV.refresh_jwt_secret_key, (err, decoder) => {
        if (err) {
          reject(err);
        } else if (!decoder) {
          reject(new Error("User is not Authorised"));
        } else {
          const user: any = decoder;
          // Redis.getValue(user.aud)
          //   .then((value) => {
          //     if (token === value) resolve(decoder);
          //     else {
          //       reject(new Error("User is not authorised"));
          //     }
          //   })
          //   .catch((e) => {
          //     reject(e);
          //   });
        }
      });
    });
  }

  private static gen_secret_key() {
    const Dev_access_secret_key = crypto.randomBytes(32).toString("hex");
    const Dev_refresh_access_secret_key = crypto
      .randomBytes(32)
      .toString("hex");

    const Prod_access_secret_key = crypto.randomBytes(32).toString("hex");
    const Prod_refresh_access_secret_key = crypto
      .randomBytes(32)
      .toString("hex");

    console.table({
      Dev_access_secret_key,
      Dev_refresh_access_secret_key,
      Prod_access_secret_key,
      Prod_refresh_access_secret_key,
    });
  }
}
