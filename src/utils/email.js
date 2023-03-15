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
  constructor(obj, url, randomAuth) {
    this.to = obj.email;
    this.name = obj.name;
    this.url = url;
    this.randomAuth = randomAuth;
    this.images = obj.images;
    this.message = obj.message;
    this.type = obj.type;
    this.from = `ATLP-Trojans <${process.env.EMAIL_FROM}>`;
  }

  // Send the  email using email
  async send(template, subject) {
    const html = await ejs.renderFile(
      path.join(__dirname, `./../emailTemplate/${template}.ejs`),
      {
        firstName: this.name,
        url: this.url,
        authNum: this.randomAuth,
        images: this.images,
        message: this.message,
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

  async reset() {
    await this.send("resetPass", "RESET PASSWORD");
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to Trojan Ecommerce");
  }

  async deactivate() {
    await this.send("accDeactivation", "Account Deactivation");
  }

  async activate() {
    await this.send("accActivation", "Account Activation");
  }

  async twoFactorAuth() {
    await this.send("2FAToken", "Verification Code");
  }

  async sendGooglePassword() {
    await this.send("googlePassword", "Default Password");
  }

  async expiredPassword() {
    await this.send("expiredPassword", "Password Expired");
  }

  async passwordUpdated() {
    await this.send("passwordUpdated", "Password Updated");
  }

  async successPassReset() {
    await this.send("successPassReset", "Password Reset");
  }

  async expiredProduct() {
    await this.send("expiredProduct", "Product Expired");
  }

  async productMadeAvailable() {
    await this.send("prodNotifns", this.type);
  }

  async productExpired() {
    await this.send("prodNotifns", this.type);
  }

  async productMadeUnAvailable() {
    await this.send("prodNotifns", this.type);
  }

  async productAdded() {
    await this.send("prodNotifns", this.type);
  }

  async productRemoved() {
    await this.send("prodNotifns", this.type);
  }

  async wishList() {
    await this.send("prodNotifns", this.type);
  }

  async productBought() {
    await this.send("prodNotifns", this.type);
  }

  async productDelayedInCart() {
    await this.send("productDelayedInCart", this.type);
  }
}

export default SendEmail;
