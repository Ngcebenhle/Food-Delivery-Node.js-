import Category from "../Models/Category";
import banner from "../Models/banner";
import item from "../Models/item";
export class itemController {
  static async addItem(req, res, next) {
    const itemData = req.body;
    const path = req.file.path;
    try {
      //create item
      let item_data: any = {
        name: itemData.name,
        status: itemData.status,
        cuisines: itemData.cuisines,
        price: itemData.price,
        veg: itemData.veg,
        category_id: itemData.category_id,
        restaurant_id: itemData.restaurant_id,
        cover: path,
      };
      if (itemData.description)
        item_data = { ...item_data, description: itemData.description };
      const newItem = await new item(item_data).save();
      res.send(itemData);

      // const data = {
      //     banner:path
      // }
      // let Banner = await new banner(path).save();
      // res.send(banner);
    } catch (e) {
      next(e);
    }

    //   res.send('it works');
  }

  static async getItemMenu(req, res, next) {
    try {
      const restaurant = req.restaurant;
      const restaurantId = req.param.restaurantID;

      const categories = await Category.find({
        restaurant_id: restaurantId,
      });

      const items = await item.find({
        status: true,
        restaurant_id: restaurantId,
      });

      // res.send(categories);
      res.json({
        restaurant,
        categories,
        item,
      });
    } catch (e) {
      next(e);
    }
  }
}
