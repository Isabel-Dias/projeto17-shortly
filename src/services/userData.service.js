import { userDataRepository } from "../repositories/userData.repository.js";

async function getOneById(id) {
  return await userDataRepository.findOneById(id)
}

async function getViewsSum(id) {
  return await userDataRepository.getViewsSum(id);
}

export const userDataService = {
  getOneById,
  getViewsSum
}