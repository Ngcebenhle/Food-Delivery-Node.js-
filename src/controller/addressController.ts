import address from "../Models/address";
import banner from "../Models/banner";
export class addressController {

  static async addAddress(req, res, next) {
    const data = req.body;
    const user_id = req.user._id;
    try {
      const addressInfo = {
        // user_id,
        title: data.title,
        address: data.address,
        landmark: data.landmark,
        // house: data.house,
        lat: data.lat,
        lng: data.lng,
      };
      let addressData = await new address(addressInfo).save();
      res.send(addressData);
    } catch (e) {
      next(e);
    }

      res.send('It works');
  }

  static async deleteAddress(req, res, next) {
    const user_id = req.user._id;
    const id = req.params.id;
    try {
      const addressData = await address.findOneAndDelete({
        user_id: user_id,
        _id: id,
      });
      res.json({ success: true });
    } catch (e) {
      next(e);
    }
  }

  static async updateAddress(req, res, next) {
    const user_id = req.user._id;
    const id = req.params.id;
    const data = req.body;
    try {
      const addressData = await address.findOneAndUpdate(
        {
          user_id: user_id,
          _id: id,
        },
        {
          user_id,
          title: data.title,
          address: data.address,
          landmark: data.landmark,
          house: data.house,
          lat: data.lat,
          lng: data.lng,
          lastUpdated_at: new Date(),
        },
        {
          new: true,
        }
      );
      if (addressData) res.send(addressData);
      else {
        throw "Address doesn't exist";
      }
    } catch (e) {
      next(e);
    }
  }

  static async getAddress(req, res, next) {
    const user_id = req.user._id;
    try {
      const addressData = await address.find(
        { user_id },
        { user_id: 0, __v: 0 }
      );
      res.send(addressData);
    } catch (e) {
      next(e);
    }
  }

  static async getAddressByID(req, res, next) {
    const user_id = req.user._id;
    const id = req.params.id;
    try {
      const addressData = await address.findOne({
        // user_id: user_id,
        _id: id,
      });
      res.send(addressData);
    } catch (e) {
      next(e);
    }
  }

  static async checkAddress(req, res, next) {
    const user_id = req.user._id;
    const data = req.query;
    try {
      const addressData = await address.findOne({
        user_id,
        lat: data.lat,
        lng: data.lng,
      });
      res.send(addressData);
    } catch (e) {
      next(e);
    }
  }

  static async getLimitedAddress(req, res, next) {
    const user_id = req.user._id;
    const limit = req.query.limit;
    try {
      const addressData = await address.find({ user_id }).limit(limit);
      res.send(addressData);
    } catch (e) {
      next(e);
    }
  }

  // static async getAddress(req, res, next){
  //     const user_id = req.user._id
  //     try{
  //         const addressData = await address.find({user_id})
  //         res.send(addressData);
  //      }
  //      catch(e){
  //         next(e)

  //      }
  // }

  // static async getAddress(req, res, next){
  //     const user_id = req.user._id
  //     try{
  //         const addressData = await address.find({user_id})
  //         res.send(addressData);
  //      }
  //      catch(e){
  //         next(e)

  //      }
  // }
}
