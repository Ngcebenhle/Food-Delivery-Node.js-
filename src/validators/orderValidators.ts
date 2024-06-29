import { body } from 'express-validator';
import Restaurant from '../Models/Restaurant';

export class orderValidator {

  static addOrder() {
    return [
      body('restaurant_id', 'restaurant ID name is required')
        .isString()
        .custom((restaurant_id, { req }) => {
          return Restaurant.findById({
            __id: restaurant_id,
          })
            .then((restaurant) => {
              if (!restaurant) {
                throw 'Restaurant does not exist';
              } else {
                req.restaurant = restaurant;
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body('order', 'Order items is required').isString(),
      body('address', 'Address is required').isString(),
      body('status', 'Status is required').isString(),
      body('payment_status', 'Payment_Status name is required').isBoolean(),
      body('payment_mode', 'Payment Mode is required').isString(),
      body('total', 'total is required').isNumeric(),
      body('grand_Total', 'Order total is required').isNumeric(),
      body('delivery_charge', 'Delivery Charge is required').isNumeric(),
    ];
  }
}
