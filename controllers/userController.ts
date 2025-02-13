import { stringify } from "querystring";
import { database, userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getUserById = (id: number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: Express.User, password: string) {
  return user.password === password;
}

function addUserToDatabase(user: Express.User) {
  return database.push(user);
}

export { getUserByEmailIdAndPassword, getUserById, addUserToDatabase };
