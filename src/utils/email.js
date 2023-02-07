/* eslint-disable require-jsdoc */

import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";



const emailTransport = () => {
  if (process.env.NODE_ENV === "production") {
    // Sendgrid
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
      secure: false,
    });
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

class SendEmail {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `Welcome to <${process.env.EMAIL_FROM}>`;
  }

  // Send the  email using email
  async send(template, subject) {
    const html = await ejs.renderFile(
      path.join(__dirname, `./../emailTemplate/${template}.ejs`),
      {
        firstName: this.name,
        url: this.url,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: html,
    };

    await emailTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
      await this.send("welcome", "Welcome to Trojan Ecommerce");
  }
}


export default SendEmail;
