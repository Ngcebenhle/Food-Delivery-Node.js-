import { Router } from "express";
import { UserController } from "../controller/UserController";
import { body, validationResult } from "express-validator";
import { userValidator } from "../validators/userValidators";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";

class UserRouter {
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
      "/send/verification/email",
      // userValidator.verifyUserForEmailRe_Send(), 
      // globalMiddleWare.checkError,
      globalMiddleWare.auth,
      UserController.reSendVerificationEmail
    );

    this.router.get(
      "/login",
      userValidator.login(), 
      globalMiddleWare.checkError,
      UserController.login
    );

    this.router.get(
      "/send/reset/password/token",
      userValidator.checkResetPassword(),
      globalMiddleWare.checkError,
      UserController.sendResetPasswordOtp
    );

    this.router.get(
      "/verify/reset/password",
      userValidator.verifycheckResetPassword(),
      globalMiddleWare.checkError,
      UserController.verifysendResetOtp
    );

    this.router.get(
      "/profile",
      // userValidator.verifycheckResetPassword(),
      globalMiddleWare.auth,
      UserController.profile
    );
  }

  postRoutes() {
    this.router.post(
      "/signup",
      userValidator.signup(), 
      globalMiddleWare.checkError,
      UserController.signup
    );
 
    this.router.post(
      "/refresh_token",
      // userValidator.checkRefreshToken(),
      globalMiddleWare.decodRefreshToken,
      // globalMiddleWare.checkError,
      UserController.newToken
    );

    
    this.router.post(
      "/logout",
      globalMiddleWare.auth,
      // userValidator.checkRefreshToken(),
      globalMiddleWare.decodRefreshToken,
      // globalMiddleWare.checkError,
      UserController.logout
    );
  }

  putRoutes() {

    this.router.put(
      "/update/profilePic",
      globalMiddleWare.auth,
      new utils().multer.single('profileImage'),
      userValidator.verifyUserProfilePic(), 
      globalMiddleWare.checkError,
      UserController.updateUserprofilePic
    );
  }

  patchRoutes() {

    this.router.patch(
      "/verify",
      globalMiddleWare.auth,
      userValidator.userVerified(),
      globalMiddleWare.checkError,
      UserController.verify
    );

    this.router.patch(
      "/reset/password",
      userValidator.ResetPassword(),
      globalMiddleWare.checkError,
      UserController.ResetPassword
    );

    this.router.patch(
      "/update/phone",
      globalMiddleWare.auth,
      userValidator.verifyPhoneNumber(),
      globalMiddleWare.checkError,
      UserController.updatePhoneNumber
    );

    this.router.patch(
      "/update/profile",
      globalMiddleWare.auth,
      userValidator.verifyUserProfile(),
      globalMiddleWare.checkError,
      UserController.updateUserprofile
    );
  }

  deleteRoutes() {}
}

export default new UserRouter().router;
