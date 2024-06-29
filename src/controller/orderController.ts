import banner from '../Models/banner'
import order from '../Models/order'
export class orderController {

    static async addOrder(req, res, next){
     
        const data = req.body;
        const user_id = req.user._id
        try{
           let orderInfo: any = {
            // user_id,
            //  restaurant_id: data.restaurant_id,
            order: data.order,
             address: data.address,
            status: data.status,
            payment_status: data.payment_status,
            payment_mode: data.payment_mode,
             total: data.total,
             grand_Total: data.grand_Total,
             delivery_charge: data.delivery_charge,
           }

           if(data.instruction) orderInfo = {...orderInfo, instruction:data.instruction}
           let orderData = await new order(orderInfo).save();
           
          res.send(orderData);
        }
        catch(e){
           next(e)
   
        }
     
        //  res.send('its working');
    }

    static async getOrder(req, res, next){
      const user_id = req.user._id
      const perPage = 5;
      const currentPage = parseInt(req.query.page) || 1
      const prevpage = currentPage == 1 ? null : currentPage -1;
      let nextPage = currentPage + 1; 
       
      
        try{
          const order_doc_count = await order.countDocuments({
            
            
            user_id: user_id
          })
          // if(!order_doc_count){
          //   res.json({
          //     orders:[],
          //     perPage,
          //     currentPage,
          //     prevpage,
          //     nextPage:null,
          //     totalPages:0
          //   })
          // }
          // const totalPages = Math.ceil(order_doc_count/perPage);
          // if(totalPages == 0 || totalPages == currentPage){
          //   nextPage = 0;
          // }
          // if(totalPages < currentPage){
          //   throw('No more Addresses orders available')
          // }
            const orders = await order.find({
               user_id
            },
            {
               user_id: 0, 
               __v:0
            }
         )
        //  .skip((perPage * currentPage) - perPage)
        //  .limit(perPage)
        //  .sort({'created_at': -1}).populate('restaurant_id')
        //  .exec()
            // res.send(orders);
            res.json({
              orders,
              // perPage,
              // currentPage,
              // prevpage,
              // nextPage,
              // totalPages
            })
         } 
         catch(e){
            next(e)
    
         }
    }
} 