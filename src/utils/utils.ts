import * as Bcrypt from "bcrypt";
import { resolve } from "path";
import { env } from "process";
import * as jwt from "jsonwebtoken";
import * as Multer from "multer";
import * as dotenv from "dotenv";

const destinationOptions = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + file.originalname);
    // cb(null,file.fieldname + '-' + uniqueSuffix + file.mimetype)
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export class utils {
  
  public multer = Multer({
    storage: destinationOptions,
    fileFilter: fileFilter,
  });

  static token_timeout() {
    return 5 * 60 * 1000;
  }
  // public Max_TOKEN_TIME =

  static tokenGen(digit: number = 6) {
    let otp = "";
    for (let i = 0; i < digit; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    // return parseInt(otp);
    return otp;
  }

  static encriptPassword(password) {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  }

  static comparetPassword(data: {
    password: string;
    encrypt_password: string;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(data.password, data.encrypt_password, (err, same) => {
        if (err) {
          reject(err);
        } else if (!same) {
          reject(new Error("email and password Dont match"));
        } else {
          resolve(true);
        }
      });
    });
  }

  static dotenvConfig() {
    dotenv.config({ path: __dirname + "/.env" });
  }

  currentDate() {
    return new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    });
  }
}
