import bcrypt from "bcrypt";
import { signInRepository } from "../repositories/signIn.repository.js";

async function getOne(email) {
  const user = await signInRepository(email);

  return user;
}

async function comparePassword(password, inputPassword) {
  return bcrypt.compareSync(password, inputPassword);
}

async function postOne(token, id) {
  await signInRepository.insertOne(token, id);
  return;
}

export const signInService = {
  getOne,
  comparePassword,
  postOne
};
