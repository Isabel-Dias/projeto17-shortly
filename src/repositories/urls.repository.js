import db from "../database/database.connection.js";

async function insertOne(id, url, shortUrl) {
  await db.query(
    `INSERT INTO urls
    (user_id, url, short_url)
    VALUES
    ($1, $2, $3)`,
    [id, url, shortUrl]
  );
  return;
}

async function findOneById(id) {
  return await db.query(
    `SELECT * FROM urls
    WHERE 
    id = $1;`,
    [id]
  );
}

async function findOneByShortUrl(shortUrl) {
  return await db.query(
    `SELECT *
    FROM urls
    WHERE short_url = $1`,
    [shortUrl]
  );
}

async function updateOne(increasedCount, id) {
  await db.query(
    `UPDATE urls 
    SET views = $1
    WHERE id = $2`,
    [increasedCount, id]
  );
  return;
}

async function deleteOne(urlId) {
  await db.query(
    `DELETE 
    FROM urls
    WHERE id = $1`,
    [urlId]
  );
  return;
}

export const urlsRepository = {
  insertOne,
  findOneById,
  findOneByShortUrl,
  updateOne,
  deleteOne,
};
