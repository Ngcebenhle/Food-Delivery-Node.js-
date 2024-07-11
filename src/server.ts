import * as express from "express";
import * as mangoose from "mongoose";
import UserRouter from "./Router/User";
import bannerRouter from "./Router/bannerRoutes";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { envVariables } from "./ENV/enviromentAccess";
import cityRouter from "./Router/cityRoutes";
import restaurantRouter from "./Router/restaurantRouter";
import categoryRouter from "./Router/categoryRoutes";
import itemRouter from "./Router/itemRoutes";
import addressRouter from "./Router/addressRoutes";
import orderRouter from "./Router/orderRoutes";
import * as dotenv from "dotenv";
import { utils } from "./utils/utils";
import { Redis } from "./utils/redis";

export class server {
  // : express.Application

  public app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.errorHandler();
  }
  setConfigs() {
    this.dotenvConfig();
    this.connectMongoDB();
    // this.connectRedis();
    this.allowCors();
    this.configBodyParser();
  }
  configBodyParser() {
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }
  allowCors() {
    this.app.use(cors());
  }
  dotenvConfig() {
    // dotenv.config({path:__dirname + '/.env'})
    utils.dotenvConfig();
  }
  connectMongoDB() {
    mangoose.connect(envVariables().db_uri).then(() => {
      console.log("Connected to MongoDB");
    });
  }
  connectRedis() {
    Redis.connectToRedis();
  }
  setRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World! i am alive  yeahhh lest go");
    });
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/uploads/", express.static("src/uploads"));
    this.app.use("/api/banner", bannerRouter);
    this.app.use("/api/city", cityRouter);
    this.app.use("/api/restaurant", restaurantRouter);
    this.app.use("/api/category", categoryRouter);
    this.app.use("/api/item", itemRouter);
    this.app.use("/api/address", addressRouter);
    this.app.use("/api/order", orderRouter);
  }
  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        massage: "Not Found",
        status_code: 404,
      });
    });
  }
  errorHandler() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        massage: error.massage || "Something Went Wrong",
        status_code: errorStatus,
      });
    });
  }
  //   userRoutes() {}
}
