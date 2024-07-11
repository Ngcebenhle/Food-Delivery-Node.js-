import { body, validationResult } from "express-validator";
import userModel from "../Models/userModel";
import { utils } from "../utils/utils";
// import { nodemailer } from "../utils/nodemailer";
import * as jwt from "jsonwebtoken";
import { jwt_secret_key } from "../ENV/enviromentAccess";
import { Jwt } from "../utils/jwt";
import { Redis } from "../utils/redis";
import { error } from "node:console";
// const nodemailer = require("nodemailer");
import * as nodemailer from 'nodemailer'
import { json } from "body-parser";
import { DevENV } from "../ENV/DevEnviromentViriable";

export class UserController {
  
  static async signup(req, res, next) {
    // const data = [{ name: "I Am " }];
    // res.status(200).send(data);

    // res.status(422).json({
    //     massage: 'Email and password do not match',
    //     status_code: 404
    // });

    // const error = new Error("Email and password do not match");
    // next(error);

    // const errors = validationResult(req);
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const status = req.body.status;

    const verification_token_opt = utils.tokenGen(5);

    // if (!errors.isEmpty()) {
    //   // return res.status(400).json({
    //   //   errors: errors.array().map(x => x.msg)
    //   // });
    //   next(new Error(errors.array()[0].msg));
    // }

    // if (!email){
    //     const error = new Error('email is required');
    //     next(error);
    // }else if (!password){
    //     const error = new Error('password is required');
    //     next(error);
    // }

    try {
      const hash = await utils.encriptPassword(password);
      const data = {
        email,
        verification_token_opt,
        verification_token_opt_timeout: Date.now() + utils.token_timeout(),
        phone,
        password: hash,
        name,
        type,
        status,
      };

      // let user = await new userModel(data).save();

      // const user_data = {
      //   email: user.email,
      //   // email_verified: user.email_verified,
      //   verification_token_opt,
      //   phone: user.phone,
      //   name: user.name,
      //   type: user.type,
      //   status: user.status,
      //   created_at: user.created_at,
      //   lastUpdated_at: user.lastUpdated_at,
      // };

      // const payload = {
      //   userId: user.id,
      //   email: user.email,
      //   type: user.type,
      // };

      // const access_token = Jwt.jwtSign(payload, user.id);
      // const refresh_token = await Jwt.jwtSignRefresgToken(payload, user.id);


      // const access_token = jwt.sign(
      //   payload,
      //   jwt_secret_key,
      //   {expiresIn: '1d'}
      // )

     
      // await nodemailer.sendMail({
      //   to:[email],
      //   subject: 'test',
      //   html: `<h1>Your Opt is ${verification_token_opt}<h1>`
      // })
      // await nodemailer.sendMail().then(w =>{
      //    console.log('We winning')
      // }).catch(e=>{
      //  throw error(e)
      // })


      const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user:DevENV.username,
          pass:DevENV.password,
        },
        tls: {
          rejectUnauthorized: false
        },
      });

      
      async function main(email, otp) {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: `Your OTP is ${otp}`, // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }

      main(email,verification_token_opt).catch(console.error);
      
      res.json({
        Success: true
        // token: access_token,
        // refresh_token:refresh_token,
        // user: user_data,
      });

    } catch (e) {
      next(e);
    }

    // user
    //   .save()
    //   .then((user) => {
    //     res.send(user);
    //   })
    //   .catch((e) => {
    //     const err = new Error(e);
    //     next(err);
    //   });
  }

  static async verify(req, res, next) {

    const verification_token = req.body.verification_token_opt;
    const email = req.user.email;

    try {

      const user = await userModel.findOneAndUpdate(
        {
          email: email,
          verification_token_opt: verification_token,
          // verification_token_opt_timeout: { $st: Date.now() },
        },
        {
          email_verified: true,
          lastUpdated_at: new Date(),
        },
        {
          new: true,
          projection: {
            verification_token_opt: 0,
            verification_token_opt_timeout: 0,
            password: 0,
            reset_password_token_opt: 0,
            reset_password_token_opt_timeout: 0,
            __v: 0,
          },
        }
      );

      // const data = {
      //   email,
      //   user
      // }
      if (user) {
      // res.json(data)
       res.send(user)

      } else {
        throw ("Email verification Token Timeout...");
      }

      
    } catch (e) {
      next(e);
    }
  }

  static async reSendVerificationEmail(req, res, next) {
    const email = req.query.email;
    const verification_token = utils.tokenGen(6);

    try {
      const user = await userModel.findOneAndUpdate(
        {
          email: email,
        },
        {
          lastUpdated_at: new Date(),
          verification_token_opt: verification_token,
          verification_token_opt_timeout: Date.now() +  utils.token_timeout(),
        }
      );
      if (user) {


        const transporter = nodemailer.createTransport({
          service:"gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user:DevENV.username,
            pass:DevENV.password,
          },
          tls: {
            rejectUnauthorized: false
          },
        });
  
        
        async function main(email, otp) {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `Your OTP is ${otp}`, // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
  
        main(email,verification_token).catch(console.error);

        // await nodemailer.sendMail({
        //   to: [email],
        //   subject: "test",
        //   html: `<h1>Your Opt is ${verification_token}<h1>`,
        // });
        res.json({ success: true,
          user
         });
      } else {
        throw new Error("User does not exists...");
      }
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    const user = req.user;

    // const email = req.body.email;
    const password = req.query.password;
    const encrypt_password = req.user.password;

    const data = {
      password,
      encrypt_password: user.password,
    };

     await utils.comparetPassword(data);
    
     const payload = {
      // userId: user.id,
      email: user.email,
      type: user.type,
    };
    const access_token = Jwt.jwtSign(payload, user.id);
    const refresh_token = await Jwt.jwtSignRefresgToken(payload, user.id);

    const user_data = {
      email: user.email,
      email_verified: user.email_verified,
      phone: user.phone,
      name: user.name,
      type: user.type,
      status: user.status,
      created_at: user.created_at,
      lastUpdated_at: user.lastUpdated_at,
    };
    res.json({
      token: access_token,
      refresh_token: refresh_token,
      user: user_data,
    });

    res.send(req.user);
  }

  static async sendResetPasswordOtp(req, res, next) {
    const email = req.query.email;
    const reset_password_token_opt = utils.tokenGen(6);

    try {
      const user = await userModel.findOneAndUpdate(
        {
          email: email,
        },
        {
          lastUpdated_at: new Date(),
          reset_password_token_opt: reset_password_token_opt,
          // reset_password_token_opt_timeout: Date.now() * utils.token_timeout(),
        }
      );
      if (user) {
        res.json({ success: true,
          user
         });

         const transporter = nodemailer.createTransport({
          service:"gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user:DevENV.username,
            pass:DevENV.password,
          },
          tls: {
            rejectUnauthorized: false
          },
        });
  
        
        async function main(email, otp) {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `Your OTP is ${otp}`, // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
  
        main(email,reset_password_token_opt).catch(console.error);
        // await nodemailer.sendMail({
        //   to: [email],
        //   subject: "Reset Password Email otp",
        //   html: `<h1>Your Opt is ${reset_password_token_opt}<h1>`,
        // });
      } else {
        throw new Error("User does not exixts...");
      }
    } catch (e) {
      next(e);
    }
  }

  static async verifysendResetOtp(req, res, next) {
    try {
      res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  static async ResetPassword(req, res, next) {
    const user = req.user;
    const new_password = req.body.new_password;

    try {
      const encrypt_password = await utils.encriptPassword(new_password);
      const updateduser = await userModel.findOneAndUpdate(
        {
          _id: user.aud,
        },
        {
          lastUpdated_at: new Date(),
          password: encrypt_password,
        },
        {
          new: true,
          projection: {
            verification_token_opt: 0,
            verification_token_opt_timeout: 0,
            password: 0,
            reset_password_token_opt: 0,
            reset_password_token_opt_timeout: 0,
            __v: 0,
          },
        }
      );
      if (updateduser) {
        res.json({ updateduser });
      } else {
        throw new Error("User does not exixts...");
      }
    } catch (e) {
      next(e);
    }
  }

  static async profile(req, res, next) {
    const user = req.user;
    try {
      const profile = await userModel.findById(user.aud);

      if (profile) {
        const user_data = {
          email: profile.email,
          // email_verified: profile.email_verified,
          phone: profile.phone,
          name: profile.name,
          type: profile.type,
          status: profile.status,
          created_at: profile.created_at,
          lastUpdated_at: profile.lastUpdated_at,
        };
        res.json(user_data);
      } else {
        throw new Error("User does not exixts...");
      }
    } catch (e) {
      next(e);
    }
  }

  static async updatePhoneNumber(req, res, next) {
    const user = req.user;
    const phone = req.body.phone;
    try {
      const userdata = await userModel.findOneAndUpdate(
        user._id,
        { 
          phone: phone, 
          lastUpdated_at: new Date() 
        },
        {
          new: true,
          projection: {
            verification_token_opt: 0,
            verification_token_opt_timeout: 0,
            password: 0,
            reset_password_token_opt: 0,
            reset_password_token_opt_timeout: 0,
            __v: 0,
          },
        }
      );
      res.send(userdata);
    } catch (e) {
      next(e);
    }
  }

  static async updateUserprofile(req, res, next) {
    const user = req.user;
    const phone = req.body.phone;
    const new_email = req.body.email;
    const plain_password = req.body.password;
    const verification_token = utils.tokenGen();
    try {
      const userdata = await user.findById(user.aud);
      if(!userdata) throw('User doesn\'t exist')
      await utils.comparetPassword({
        password: plain_password,
        encrypt_password: userdata.password,
      });

      const updateuser = await user.findOneAndUpdate(
        user._id,
        {
          phone: phone,
          email: new_email,
          email_verified: false,
          verication_token: verification_token,
          verification_token_opt_timeout: Date.now() * utils.token_timeout(),
        },
        {
          new: true,
          projection: {
            verification_token_opt: 0,
            verification_token_opt_timeout: 0,
            password: 0,
            reset_password_token_opt: 0,
            reset_password_token_opt_timeout: 0,
            __v: 0,
          },
        }
      );

      const payload = {
        id: user._id,
        email: updateuser.email,
        type: updateuser.type,
      };
      // const access_token = Jwt.jwtSign(payload, user._id, { expiresIn: "1h" });
      // const refresh_token = await Jwt.jwtSignRefresgToken(payload, user._id, {
      //   expiresIn: "180d",
      // });
      res.json({
        // token: access_token,
        // refresh_token: refresh_token,
        user: updateuser,
      });

      
      const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user:DevENV.username,
          pass:DevENV.password,
        },
        tls: {
          rejectUnauthorized: false
        },
      });  
      async function main(email, otp) {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: "Hello ✔", // Subject line
          text: `Your OTP is ${otp}`, // plain text body
          html: "<b>Hello world?</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      main( updateuser.email,verification_token).catch(console.error);

      // await nodemailer.sendMail({
      //   to: [updateuser.email],
      //   subject: "",
      //   html: `<h1> your Otp is ${verification_token} </h1>`,
      // });
      // res.send(userdata);
    } catch (e) {
      next(e);
    }
  }

  static async newToken(req, res, next) {
    //  const refreshtoken = req.body.refreshtoken;
    //  const decoded_data = Jwt.jwtVerifyRefresgToken(refreshtoken);
    const decoded_data = req.user;
    try {
      if (decoded_data) {
        const payload = {
          // email: decoded_data.email,
          // type: decoded_data.type
        };
        const access_token = Jwt.jwtSign(payload, decoded_data, );
        const refresh_token = await Jwt.jwtSignRefresgToken(
          payload,
          decoded_data,
        );
        res.json({
          token: access_token,
          refresh_token: refresh_token,
        });
      } else {
        req.errorStatus = 403;
        throw "Access is Forbidden";
      }
    } catch (e) {
      req.errorStatus = 403;
      next(e);
    }
  }

  static async logout(req, res, next) {
    const refreshtoken = req.body.refreshtoken;
    const decoded_data = req.user;
    try {
      // const decoded_data = Jwt.jwtVerifyRefresgToken(refreshtoken);
      if (decoded_data) {
        await Redis.deleteValue(decoded_data.aud);
        res.send({ success: true });
      } else {
        req.errorStatus = 403;
        throw "Access is Forbidden";
      }
    } catch (e) {
      req.errorStatus = 403;
      next(e);
    }
  }

  static async updateUserprofilePic(req, res, next) {
    const path = req.file.path;
    const user = req.user;

    try {
      const UserToUpdate = await userModel.findByIdAndUpdate(
        user.aud,
        {
          photo: path,
          lastUpdated_at: new Date(),
        },
        {
          new: true,
          projection: {
            verification_token_opt: 0,
            verification_token_opt_timeout: 0,
            password: 0,
            reset_password_token_opt: 0,
            reset_password_token_opt_timeout: 0,
            __v: 0,
          },
        }
      );

      res.send(UserToUpdate);
    } catch (e) {
      next(e);
    }
  }
}
