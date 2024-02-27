import { MailOption } from "./../interfaces/email.interface";
import nodemailer from "nodemailer";

const sendMail = async (
  email: string,
  subject: string,
  message: string,
  link: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWROD_GMAIL,
      },
    });
    const mailOption: MailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: `<div>
		
	<h1>${subject} </h1>
	<p>${message}</p>
	<b><a href=${link}>click me</a></b>
  
			 </div>`,
    };

    transporter.sendMail(mailOption, (error, success) => {
      if (error) {
        throw new Error(`error send email is ${error}`);
      }
    });
  } catch (error) {
    throw new Error(`send email error is ${error}`);
  }
};

export default sendMail;
