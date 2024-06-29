import banner from '../Models/banner'
export class bannerController {

    static async addBanner(req, res, next){
     
     const path = req.file.path;
     try{
        let data: any = {
            banner:path
        };
        if(req.body.restaurant_id){
           data = {...data, restaurant_id:req.body.restaurant_id}
        }
        const Banner = await new banner(data).save();
        res.send(Banner);
     }
     catch(e){
        next(e)

     }
    
    }

    static async getBanner(req, res, next){
        try{
            const Banner = await banner.find({})
            res.send(Banner);
         }
         catch(e){
            next(e)
    
         }
    }
}