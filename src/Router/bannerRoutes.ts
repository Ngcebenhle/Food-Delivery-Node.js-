import { Router } from "express";
import { UserController } from "../controller/UserController";
import { body, validationResult } from "express-validator";
import { userValidator } from "../validators/userValidators";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { bannerValidator } from "../validators/bannerValidator";
import { bannerController } from "../controller/bannerController";
import { utils } from "../utils/utils";

class bannerRouter {
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
        "/get/banner",
        globalMiddleWare.auth,
        bannerController.getBanner
      );

  }

  postRoutes() {
    
    this.router.post(
        "/add/banner",
       
        globalMiddleWare.auth,
        globalMiddleWare.adminrole, 
        new utils().multer.single('banner'),
        bannerValidator.addBanner(),
        globalMiddleWare.checkError,
        bannerController.addBanner
      );
  }

  putRoutes() {}

  patchRoutes() {}

  deleteRoutes() {}
}

export default new bannerRouter().router;
