import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { itemController } from "../controller/itemController";
import { itemValidator } from "../validators/itemValidator";

class itemRouter {
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
      "/items/:restaurantID",
      globalMiddleWare.auth,
      itemValidator.getItemMenu(),
      globalMiddleWare.checkError,
      itemController.getItemMenu
    );
  }

  postRoutes() {
    this.router.post(
      "/create/item",
      globalMiddleWare.auth,
      globalMiddleWare.adminrole,
      new utils().multer.single("itemImage"),
      itemValidator.addItem(),
      globalMiddleWare.checkError,
      itemController.addItem
    );
  }

  putRoutes() {}

  patchRoutes() {}

  deleteRoutes() {}
}

export default new itemRouter().router;
