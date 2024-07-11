import * as nodeMailer from "nodemailer";
import * as SendGrid from "nodemailer-sendgrid-transport";
import { DevENV } from "../ENV/DevEnviromentViriable";

export class nodemailer {
  private static initiateTransport() {
    // return nodeMailer.createTransport(
    //   // SendGrid({
    //   //   auth: {
    //   //     api_key: "SENDGRID_PASSWORD",
    //   //   },
    //   // })
     
    //   {
    //     service:'gmail',
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false, // Use `true` for port 465, `false` for all other ports
    //     auth:{
    //       user:process.env.DEV_GMAIL_USER,
    //       pass:process.env.DEV_GMAIL_PASSWORD
    //     }
  
    //   }
    // );

    return nodeMailer.createTransport({
      service:'gmail',
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });
  }

  // static sendMail(data: {
  //   to: [string],
  //   subject: string,
  //   html: string
  // }): Promise<any> {
  //   return nodemailer.initiateTransport().sendMail({
  //     from: "tprojects365@gmail.com",
  //     to: data.to,
  //     subject: data.subject,
  //     html: data.html,
  //   });
  // }

  static sendMail(){
    return nodemailer.initiateTransport().sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body

  });
 
  }
  // static async mail () {
  //   // send mail with defined transport object
  //   const info = await transporter.sendMail({
  //     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
  //     to: "bar@example.com, baz@example.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Hello world?", // plain text body
  //     html: "<b>Hello world?</b>", // html body
  //   });
  
  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  // }
}
