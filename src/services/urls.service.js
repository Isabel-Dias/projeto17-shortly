import { nanoid } from "nanoid"
import { urlsRepository } from "../repositories/urls.repository.js";

async function postOne(id, url) {
  const shortUrl = nanoid(8)
  const urlRes = {
    id: id,
    shortUrl: shortUrl,
  };

  await urlsRepository.insertOne(id, url, shortUrl);
  return urlRes;
}

async function getOneById(id) {
  return await urlsRepository.findOneById(id);
}

async function getOneByShortUrl(shortUrl) {
  return await urlsRepository.findOneById(shortUrl);
}

async function updateOne(increasedCount, id) {
  await urlsRepository.updateOne(increasedCount, id);
  return;
}

async function deleteOne(urlId) {
  await urlsRepository.deleteOne(urlId);
  return;
}

export const urlsService = {
  postOne,
  getOneById,
  getOneByShortUrl,
  updateOne,
  deleteOne
};
