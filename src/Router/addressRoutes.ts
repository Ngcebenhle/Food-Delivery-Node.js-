import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { addressValidator } from "../validators/addressValidators";
import { addressController } from "../controller/addressController";

class addressRouter {
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
      "/address",
      globalMiddleWare.auth,
    //   addressValidator.addAddress(),
      globalMiddleWare.checkError,
      addressController.getAddress
    );

    this.router.get(
        "/getUserAddress/:id",
        globalMiddleWare.auth,
      //   addressValidator.addAddress(),
        // globalMiddleWare.checkError,
        addressController.getAddressByID
      );

      this.router.get(
        "/checkAddress",
        globalMiddleWare.auth,
        addressValidator.checkAddress(),
        // globalMiddleWare.checkError,
        addressController.checkAddress
      );

      this.router.get(
        "/checkAddress/:limit",
        globalMiddleWare.auth,
        addressValidator.getLimitedAddress(),
        // globalMiddleWare.checkError,
        addressController.getLimitedAddress
      );
  }

  postRoutes() {

    this.router.post(
      "/create/address",
      globalMiddleWare.auth,
    //   globalMiddleWare.adminrole,
    //   new utils().multer.single("item/cover"),
      addressValidator.addAddress(),
      globalMiddleWare.checkError,
      addressController.addAddress
    );
  }

  putRoutes() {}

  patchRoutes() {
    this.router.patch(
        "/edit/:id",
        globalMiddleWare.auth,
      //   globalMiddleWare.adminrole,
      //   new utils().multer.single("item/cover"),
        addressValidator.editAddress(),
        globalMiddleWare.checkError,
        addressController.updateAddress
      );
  }

  deleteRoutes() {
    this.router.delete(
        "/delete/:id",
        globalMiddleWare.auth,
      //   addressValidator.addAddress(),
        globalMiddleWare.checkError,
        addressController.deleteAddress
      );
  }
}

export default new addressRouter().router;
