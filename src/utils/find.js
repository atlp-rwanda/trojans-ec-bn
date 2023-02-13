/* eslint-disable require-jsdoc */
import { User } from "../database/models";

export default async function findUser(data) {
  const user = await User.findOne({ where: { data } });
  return user;
}
