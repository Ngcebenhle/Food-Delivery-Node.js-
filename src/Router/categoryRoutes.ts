import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { categoryController } from "../controller/categoryController";

class categoryRouter {
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
        "/getCategories/:resID",
        globalMiddleWare.auth,
        categoryController.getReataurantCategory
       
      );

  }

  postRoutes() {
    
    this.router.post(
        "/add/banner",
       
        globalMiddleWare.auth,
        globalMiddleWare.adminrole,
        new utils().multer.single('banner'),
        globalMiddleWare.checkError,
        // bannerController.addBanner
      );
  }

  putRoutes() {}

  patchRoutes() {
    

  }

  deleteRoutes() {}
}

export default new categoryRouter().router;
