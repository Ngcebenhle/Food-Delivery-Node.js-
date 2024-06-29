import City from "../Models/City";

export class cityController {
  static async addCity(req, res, next) {
   
    const name = req.body.name;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const status = req.body.status;

    try {
      const data = {
        name,
        lat,
        lng,
        status,
      };
      const city = await new City(data).save();
      res.send(city);
    } catch (e) {
      next(e);
    }
  }

  static async getcity(re, res, next) {
    try {
      const cities = await City.find({ status: "active" });
      res.send(cities);
    } catch (e) {
      next(e);
    }
  }
}
