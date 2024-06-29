import Restaurant from "../Models/Restaurant";
import { utils } from "../utils/utils";
import userModel from "../Models/userModel";
import Category from "../Models/Category";
import banner from "../Models/banner";
import test from "node:test";

export class restaurantController {
  // search the location data
  static async addRestaurant(req, res, next) {
    const restaurant = req.body;
    const path = req.file.path;
    const verification_token = utils.tokenGen();

    try {
      // create restaurant user
      const hash = await utils.encriptPassword(restaurant.password);

      const data = {
        email: restaurant.email,
        verification_token_opt: verification_token,
        verification_token_opt_timeout: Date.now() + utils.token_timeout(),
        phone: restaurant.phone,
        password: hash,
        name: restaurant.name,
        type: "restaurant",
        status: "active",
      };

      const user = await new userModel(data).save();

      //create restaurant
      const loc = JSON.parse(restaurant.location);
      let restaurant_data: any = {
        name: restaurant.name,
        short_name: restaurant.short_name,
        location: loc,
        address: restaurant.address,
        open_time: restaurant.open_time,
        close_time: restaurant.close_time,
        status: restaurant.status,
        cuisines: JSON.parse(restaurant.cuisines),
        price: restaurant.price,
        delivery_time: restaurant.delivery_time,
        city_id: restaurant.city_id,
        user_id: user._id,
        cover_image: path,
      };
      if (restaurant.description)
        restaurant_data = {
          ...restaurant_data,
          description: restaurant.description,
        };

      const Newrestaurant = await new Restaurant(restaurant_data).save();

      // create categories
      const categorieData = JSON.parse(restaurant.categories).map((x) => {
        return { name: x, restaurant_id: Newrestaurant._id };
      });
      const categories = Category.insertMany(categorieData);

      res.json({ Success: true });
    } catch (e) {
      next(e);
    }
  }

  static async getRestaurant(req, res, next) {
    try {
      const restaurant = await Restaurant.find({
        status: "active",
      });

      res.json({ results: restaurant });
    } catch (e) {
      next(e);
    }
  }

  static async getNearByRestaurantAndBanner(req, res, next) {
    const METERS_PER_KM = 1000;
    const data = req.query;

    // const perPage = 10;
    // const currentPage = parseInt(req.query.page) || 1;
    // const prevpage = currentPage == 1 ? null : currentPage - 1;
    // let nextPage = currentPage + 1;
    try {

      const restaurant_doc_count = await Restaurant.countDocuments({
        status: "active",
        location: {
          // $nearSphere: {
          //     $geometry:{
          //         type: 'Point',
          //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
          //     },
          //     $maxDistance: data.radius * METERS_PER_KM
          // }

          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(data.radius) / 1.6 / 3963.2,
            ],
          },
        },
      });

      // if (!restaurant_doc_count) {
      //   res.json({
      //     restaurant: [],
      //     // perPage,
      //     // currentPage,
      //     // prevpage,
      //     // nextPage: null,
      //     // totalPages: 0,
      //   });
      // }

      // const totalPages = Math.ceil(restaurant_doc_count / perPage);
      // if (totalPages == 0 || totalPages == currentPage) {
      //   nextPage = 0;
      // }
      // if (totalPages < currentPage) {
      //   throw "No more Restaurants available";
      // }

      const restaurant = await Restaurant.find({
        status: "active",
        location: {
          // $nearSphere: {
          //     $geometry:{
          //         type: "Point",
          //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
          //     },
          //     $maxDistance: data.radius * METERS_PER_KM
          // }

          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(data.radius) / 1.6 / 3963.2,
            ],
          },
        },
      })
        // .skip(currentPage * perPage - perPage)
        // .limit(perPage);

      const Banner = await banner.find({});
      // res.json(
      //    {
      //     banner,
      //     restaurant
      //    }
      // );
      res.json({
        restaurant,
        // perPage,
        // currentPage,
        // prevpage,
        // nextPage,
        // totalPages,
      });
    } catch (e) {
      next(e);
    }
  }

  static async searchNearByRestaurantAndBanner(req, res, next) {
    const METERS_PER_KM = 1000;
    const data = req.query;

    // const perPage = 10;
    // const currentPage = parseInt(req.query.page) || 1;
    // const prevpage = currentPage == 1 ? null : currentPage - 1;
    // let nextPage = currentPage + 1;
    try {
      // const restaurant_doc_count = await Restaurant.countDocuments({
      //   status: "active",
      //   name: { $regex: data.name, $options: "i" },
      //   location: {
      //     // $nearSphere: {
      //     //     $geometry:{
      //     //         type: 'Point',
      //     //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
      //     //     },
      //     //     $maxDistance: data.radius * METERS_PER_KM
      //     // }

      //     $geoWithin: {
      //       $centerSphere: [
      //         [parseFloat(data.lng), parseFloat(data.lat)],
      //         parseFloat(data.radius) / 1.6 / 3963.2,
      //       ],
      //     },
      //   },
      // });

      // if (!restaurant_doc_count) {
      //   res.json({
      //     restaurant: [],
      //     perPage,
      //     currentPage,
      //     prevpage,
      //     nextPage: null,
      //     totalPages: 0,
      //   });
      // }
      // const totalPages = Math.ceil(restaurant_doc_count / perPage);
      // if (totalPages == 0 || totalPages == currentPage) {
      //   nextPage = 0;
      // }
      // if (totalPages < currentPage) {
      //   throw "No more Restaurants available";
      // }

      const restaurant = await Restaurant.find({
        status: "active",
        name: { $regex: data.name, $options: "i" },
        location: {
          // $nearSphere: {
          //     $geometry:{
          //         type: 'Point',
          //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
          //     },
          //     $maxDistance: data.radius * METERS_PER_KM
          // }

          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.lng), parseFloat(data.lat)],
              parseFloat(data.radius) / 1.6 / 3963.2,
            ],
          },
        },
      })
        // .skip(currentPage * perPage - perPage)
        // .limit(perPage);

      const Banner = await banner.find({});
      // res.json(
      //    {
      //     banner,
      //     restaurant
      //    }
      // );

      res.json({
        restaurant,
        // perPage,
        // currentPage,
        // prevpage,
        // nextPage,
        // totalPages,
      });
    } catch (e) {
      next(e);
    }
  }
}
