import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { restaurantController } from "../controller/restaurantController";
import { restaurantValidator } from "../validators/restaurantValidators";

class restaurantRouter {
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
        "/restaurant",
        globalMiddleWare.auth,
        restaurantController.getRestaurant
      );

    this.router.get(
      "/restaurant/nearby",
      globalMiddleWare.auth,
      restaurantValidator.getNearByRestaurant(),
      globalMiddleWare.checkError,
      restaurantController.getNearByRestaurantAndBanner
    );

    this.router.get(
      "/search/restaurant/nearby",
      globalMiddleWare.auth,
      restaurantValidator.searchNearByRestaurant(),
      globalMiddleWare.checkError,
      restaurantController.searchNearByRestaurantAndBanner
    );

    this.router.get(
      "/get/Restaurant",
      globalMiddleWare.auth,
      globalMiddleWare.adminrole,
      // restaurantValidator.searchNearByRestaurant(),
      // globalMiddleWare.checkError,
      restaurantController.getRestaurant
    );
  }

  postRoutes() {

    this.router.post(
      "/create/restaurant",
      globalMiddleWare.auth,
      globalMiddleWare.adminrole,
      new utils().multer.single("cover_image"),
      restaurantValidator.addRestaurant(),
      globalMiddleWare.checkError,
      restaurantController.addRestaurant
    );
  }

  putRoutes() {}

  patchRoutes() {}

  deleteRoutes() {}
}

export default new restaurantRouter().router;
