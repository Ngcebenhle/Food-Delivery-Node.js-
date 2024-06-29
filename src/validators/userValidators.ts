import { body, query } from "express-validator";
import userModel from "../Models/userModel";

export class userValidator {

  static signup() {
    return [
      body("name", "name is required").isString(),
      body("phone", "phone is required").isString(),
      body("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return userModel.findOne({
            email: email,
          })
          .then(user => {
            if(user){
              throw('User already exists')
            }
            else{
              return true
            }
          })
          .catch(e => {
            throw(e)
          })
        }),
      body("password", "password is required")
        .isAlphanumeric()
        .isLength({ min: 8, max: 25 })
        .withMessage("password must be between 8 - 20 characters "),
      body("type", "user role type is required").isString(),
      body("status", "user status is required").isString(),

      // .custom((req) => {
      //   if (req.email) return true;
      //   else{
      //      throw new Error('Email not Available for Validation')
      //   }
      // })
    ];
  }

  static userVerified() {
    return [
      // body("email", "email is required").isEmail(),
      body("verification_token_opt", "email_verification is required").isString(),
    ];
  }

  static verifyUserForEmailRe_Send() {
    return [query("email", "email is required").isEmail()];
  }

  static login() {
    return [
      query("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return userModel
            .findOne({
              email: email,
            })
            .then((user) => {
              if (user) {
                if (user.type == "user" || user.type == "admin") {
                  req.user = user;
                  return true;
                } else {
                  throw "user doesn\t exist";
                }
              } else {
                throw "user doesn\t exist";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      query("password", "password is required").isAlphanumeric(),
    ];
  }

  static checkResetPassword() {
    return [
      query("email", "email is required")
        .isEmail()
        .custom((email, { req }) => {
          return userModel
            .findOne({
              email: email,
            })
            .then((user) => {
              if (user) {
                return true;
              } else {
                throw "user doesnt exist";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
    ];
  }

  static verifycheckResetPassword() {
    return [

        query("email", "email is required").isEmail(),
        query("reset_password_token_opt", "Reset_Password_Required").isNumeric()
      .custom((reset_password_token_opt, {req}) => {
          return userModel.findOne({
              email: req.query.email,
              reset_password_token_opt: reset_password_token_opt,
              // reset_password_token_opt_timeout: {$gt: Date.now()}
          })
          .then(user =>{
            if(user){
              return true
            }
            else{
              throw('Token Does\nt match')
            }
          })
          .catch(e =>{
            throw new Error(e)
          })
      })

     ]
  }

  static ResetPassword(){
    return [

        body("email", "email is required").isEmail()
      .custom((email, {req}) => {
          return userModel.findOne({
              email: email,

          })
          .then(user =>{
            if(user){
              req.user = user;
              return true
            }
            else{
              throw('No user Registared in that name')
            }
          })
          .catch(e =>{
            throw new Error(e)
          })
      }),
      body("new_password", "New_Password_Required").isAlphanumeric(),
      body("reset_password_token_opt", "Reset_Password_Required").isNumeric()
      .custom((reset_password_token_opt, {req}) => {
          if(req.user.reset_password_token_opt == reset_password_token_opt){
              return true;
          }else{
            throw('Reset password token is invalid')
          }
        })

     ]
  }

  static verifyPhoneNumber() {
    return [body("phone", "phone is required").isString()];
  }

  static verifyUserProfile() {
    return [
      body("phone", "phone is required").isString(),
      body("new_email", "email is required")
        .isEmail()
        .custom((new_email, { req }) => {
          return userModel
            .findOne({
              email: new_email,
            })

            .then((user) => {
              if (!user) {
                req.user = user;
                return true;
              } else {
                throw "No user Registared in that name";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("password", "password is required").isAlphanumeric(),
    ];
  }

  static checkRefreshToken() {
    return [
      body("refreshtoken", "Refresh Token is required")
        .isString()
        .custom((refreshtoken, { req }) => {
          if (refreshtoken) {
            return true;
          } else {
            req.errorStatus = 403;
            throw "Access is forbidden";
          }
        }),
    ];
  }

  static verifyUserProfilePic() {
    return [
      body("profileImage", "Profile Image is required").custom(
        (profilPic, { req }) => {
          if (req.file) {
            return true;
          } else {
            throw "File not uploaded";
          }
        }
      ),
    ];
  }
}
