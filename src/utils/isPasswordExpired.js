/* eslint-disable require-jsdoc */
import "dotenv/config";

const checkPasswordExpired = (passwordUpdated) => {
  const expirationTime = process.env.PASSWORD_EXPIRATION_TIME;
  const now = new Date();
  const expirationDate = new Date(
    parseInt(passwordUpdated.getTime(), 10) + parseInt(expirationTime, 10)
  );
  return now >= expirationDate;
};

export default checkPasswordExpired;
