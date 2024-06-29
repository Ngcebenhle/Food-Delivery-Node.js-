import { body, param } from 'express-validator';
import Restaurant from '../Models/Restaurant';
import Category from '../Models/Category';

export class itemValidator {
  static addItem() {
    return [
      
      body('name','Item name is required').isString(),
      body('restaurant_id', 'Restaurant ID is required')
        .isString()
        .custom((restaurant_id, { req }) => {
          return Restaurant.findById({
            _id: restaurant_id,
          })
            .then((restaurant) => {
              if (!restaurant) {
                throw 'Resturant does not exist';
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),

      body('category_id', 'Category ID is required')
        .isString()
        .custom((category_id, { req }) => {
          return Category.findById({
            _id: category_id,
            restaurant_id: req.body.restaurant_id,
          })
            .then((categories) => {
              if (!categories) {
                throw 'Category does not exist';
              } else {
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body('veg', 'Item is Veg is required').isBoolean(),
      body('status', 'Status is required').isBoolean(),
      body('price', 'Price is required').isNumeric(),
      body('itemImage', 'Cover Image is required')
      .custom((cover, {req}) =>{
          if(req.file){
              return true;
          }
          else{
              throw('File not uploaded')
          }
      } ),
    ];
  }
  static getItemMenu() {
    return [
      param('restaurantID', 'Restaurant ID is required')
        .isString()
        .custom((restaurant_id, { req }) => {
          return Restaurant.findById({
            _id:restaurant_id,
          })
            .then((restaurant) => {
              if (!restaurant) {
                throw 'Resturant does not exist';
              } else {
                req.restaurant = restaurant;
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),

      // body('category_id', 'Category ID is required')
      // .custom((category_id, {req})=>{
      //     return Category.findById({
      //         // _id: category_id,
      //         restaurant_id:req.body.restaurant_id
      //     })
      //     .then(categories => {
      //        if(categories){
      //         throw('Category does not exist')
      //        }else{
      //         return true
      //        }
      //     })
      //     .catch(e =>{
      //         throw new Error(e)

      //     })
      // }),
    ];
  }

  static try(){
    return[
      body('name',' name is required').isString(),
    ]
  }
}
