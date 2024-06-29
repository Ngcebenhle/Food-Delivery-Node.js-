import Category from "../Models/Category";
import City from "../Models/City";
import { restaurantValidator } from "../validators/categoryValidators";



export class categoryController {

    static async addCity(req, res, next){
     try{

     }
     catch(e){
        next(e)
     }
    }

    static async getReataurantCategory(req, res, next){
        try{
             const restaurant_id = req.params.restaurantId
             const categories = await Category.find(
                {
                restaurant_id: restaurant_id
             },
             {__v: 0}
            )
            // .populate('restaurant_id');
             res.send(categories)
        }
        catch(e){
           next(e)
        }
    }
}