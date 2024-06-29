import { Router } from "express";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { orderController } from "../controller/orderController";
import { orderValidator } from "../validators/orderValidators";

class orderRouter {
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
        "/user/order",
        globalMiddleWare.auth,
        orderController.getOrder
      );

  }

  postRoutes() {
    
    this.router.post(
        "/addOrder",
       
        globalMiddleWare.auth,
        globalMiddleWare.adminrole,
        // new utils().multer.single('banner'),
         orderValidator.addOrder(),
        globalMiddleWare.checkError,
        orderController.addOrder
      );
  }

  putRoutes() {}

  patchRoutes() {
    

  }

  deleteRoutes() {}
}

export default new orderRouter().router;
