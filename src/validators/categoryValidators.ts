import { body,query } from "express-validator";
import userModel from "../Models/userModel";


export class restaurantValidator {

    // static addRestaurant(){
    //     return [
           
    //        body('name', 'Owner name is required').isString(),
    //        body('email', 'Email is required').isEmail()
    //        .custom((email,{req}) =>{
    //           return userModel.findOne({
    //             email:email,
    //             // type: 'user'
    //           }).then(user => {
    //                 if(user) {
    //                     throw('User Already Exists')
    //                 }else{
    //                     return true
    //                 }
    //           }).catch(e =>{
    //              throw new Error(e);
    //           })
    //        }),
    //        body('phone', 'Phone number is required').isNumeric(),
    //        body('password', 'Password is required').isAlphanumeric()
    //        .isLength({min: 8, max: 20})
    //        .withMessage('Password must be between 8 - 20 characters'),
           
    //        body('cover','Banner Image is required')
    //        .custom((cover,{req}) => {

    //        if(req.file){
    //            return true;
    //        }
    //        else{
    //            throw('File not uploaded')
    //        }
    //      }),

    //        body('res_name', 'Restaurant name is required').isString(),
    //        body('short-name', 'Restaurant short name is required').isString(),
    //        body('open-time', 'Opening_Time is required').isString(),
    //        body('close_time', 'Closing_Time is required').isString(),
    //        body('price', 'Price is required').isString(),
    //        body('delivery_time', 'Delivery Time is required').isString(),
    //        body('Status', 'Status is required').isString(),
    //        body('address', 'Address is required').isString(),
    //        body('location', 'Location is required').isString(),
    //        body('cuisines', 'Cuisines is required').isArray(),
    //        body('city_id', 'City Id is required').isString(),

    //     ];
        
    // }

    // static getNearByRestaurant(){
    //     return[
    //         query('lat', 'Latitude is required').isNumeric(),
    //         query('lng', 'Longitude is required').isNumeric(),
    //         query('radius', 'Radius is required').isNumeric(),
    //     ];
    // }

    
    // static searchNearByRestaurant(){
    //     return[
    //         query('lat', 'Latitude is required').isNumeric(),
    //         query('lng', 'Longitude is required').isNumeric(),
    //         query('radius', 'Radius is required').isNumeric(),
    //         query('name', 'Search filed is required').isString(),
    //     ];
    // }
}
