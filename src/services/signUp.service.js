import bcrypt from "bcrypt";
import { signUpRepository } from "../repositories/signUp.repository.js"

async function getOne(email) {
  const user = await signUpRepository.findOne(email);
  return user;
}

async function postOne(name, email, password) {
  const passwordHash = bcrypt.hashSync(password, 10);
  await signUpRepository.insertOne(name, email, passwordHash);
  return;
}

export const signUpService = {
  getOne,
  postOne
}