import { server } from "./server";
const Server = new server().app;
process.env.TZ = 'Asia/Calcutta'

Server.listen(process.env.PORT || 3000, ()=>{
    console.log("Running... awaiting request");
});
 