import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
    // console.log("Email sent");
  } catch (error) {
    // console.error(error);
    if (error.response) {
      // console.error(error.response.body);
    }
  }
};
// const link =
//   "<p style='font-size:16px;font-weight:600;color:black;'>Click this button to reset your password</p>&nbsp;" +
//   "<button style='background-color:#008CCF;width:200px;height:30px;border-radius:3px;border-color:#008CCF;font-size:20px;'><a style='text-decoration:none;color:white;font-weight:bold;' href='" +
//   process.env.UI_URL +
//   "/users/password-reset/" +
//   token +
//   "'>RESET PASSWORD</a></button>";

const mailer = async (email, subject, content) => {
  sendMail({
    to: email, // Change to your recipient
    from: "trojansecommerce@gmail.com", // Change to your verified sender
    subject,
    html: content,
  });
};

export default mailer;
