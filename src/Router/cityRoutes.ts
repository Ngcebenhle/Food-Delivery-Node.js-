import { Router } from "express";
import { UserController } from "../controller/UserController";
import { body, validationResult } from "express-validator";
import { userValidator } from "../validators/userValidators";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { bannerValidator } from "../validators/bannerValidator";
import {cityController } from "../controller/cityController";
import { utils } from "../utils/utils";
import { cityValidator } from "../validators/cityValidators";

class cityRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
  
    this.router.get(
        "/cities",
        cityController.getcity
      );
  }

  postRoutes() { 
    this.router.post(
        "/create/city",
        cityValidator.addCity(),
        globalMiddleWare.checkError,
        cityController.addCity
       
      );
  }

  putRoutes() {}

  patchRoutes() {
    

  }

  deleteRoutes() {}
}

export default new cityRouter().router;
