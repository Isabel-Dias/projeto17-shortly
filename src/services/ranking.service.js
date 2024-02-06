import { rankingRepository } from "../repositories/ranking.repository.js";

async function getAll() {
  const ranking = await rankingRepository.findAll();
  return ranking.rows;
}

export const rankingService = {
  getAll,
};
