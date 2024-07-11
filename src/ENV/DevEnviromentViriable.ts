export const DevENV = {
    db_uri: 'mongodb+srv://zaiotestapp:7fYLfUvsc5Ic4qLt@zaiotestapp.nityybv.mongodb.net/ZaioTestApp?retryWrites=true&w=majority&appName=ZaioTestApp',
    jwt_secret_key: 'you',
    refresh_jwt_secret_key: 'me@andyou',
    username:"tprojects365@gmail.com",
    password:"igoumleqpvoskuhe",

    sendgrid: {
        api_key: process.env.DEV_SENDGRID_API_KEY,
        email_from:process.env.DEV_SENDGRID_SENDER_EMAIL
    },
    gmail_auth: {
        user:process.env.DEV_GMAIL_USER,
        pass:process.env.DEV_GMAIL_PASSWORD
    },
    redis:{
        username: process.env.DEV_LOCAL_REDIS_USERNAME,
        password: process.env.DEV_LOCAL_REDIS_PASSWORD,
        host: process.env.DEV_LOCAL_REDIS_HOST,
        port: process.env.DEV_LOCAL_REDIS_PORT // or parseInt(process.env.DEV_LOCAL_REDIS_PORT),
    }



}