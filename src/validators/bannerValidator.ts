import { body } from "express-validator";

// return [
//     body('banner','Banner Image is required').isArray
//     .custom((,{}) => {

//     })
//     .then( => {

//     })
//     .catch(e => {

//     })
// ];

export class bannerValidator {
  static addBanner() {
    return [
      body("banner", "Banner Image is required")
      .custom((banner, { req }) => {
        if (req.file) {
          return true;
        } else {
          throw ("File not uploaded");
        }
      }),
    ];
  }
}
