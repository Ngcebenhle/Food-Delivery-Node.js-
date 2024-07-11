import { validationResult } from "express-validator";
import { utils } from "../utils/utils";
import { Jwt } from "../utils/jwt";

export class globalMiddleWare{
  
    static checkError (req, res, next){
         
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(x => x.msg)
      });
      // next(new Error(errors.array()[0].msg + 'Validation Error'));
    }
    else{
        next();
    }

    }

    static async auth(req, res, next) {
    const header_auth = req.headers.authorization;
    const token = header_auth ? header_auth.slice(7,header_auth.length) : null;
     try{
      req.errorStatus = 401;
        const decoded = await Jwt.jwtVerify(token);
        req.user = decoded;
        // console.log(req.user)
        next();
     }
     catch(e){
       next(e)
     }
  }

  static adminrole(req, res, next) {
     const user = req.user; 
    //  console.log(user)   
     if(user.type !== "admin"){
      req.errorStatus = 401;
      next(new Error('Un-Authorised User'));
    }
    next()
  }

  static async decodRefreshToken(req, res, next) {
    const refreshtoken = req.body.refreshtoken;
     try{
      if(!refreshtoken){
        req.errorStatus = 403
        throw('Access is Forbidden')
      }
      const decoded = await Jwt.jwtVerify(refreshtoken);
        req.decoded = decoded;
        next();
     }
     catch(e){
      req.errorStatus = 401
       next(e)
     }
  }
}