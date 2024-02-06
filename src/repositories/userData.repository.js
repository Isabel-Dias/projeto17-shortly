import db from "../database/database.connection.js";

async function findOneById(id) {
  return await db.query(
    `SELECT users.name, urls.*
    FROM users
    JOIN urls 
    ON users.id = urls.user_id
    WHERE users.id = $1;`,
    [id]
  );
}

async function getViewsSum(id) {
  return await db.query(
    `SELECT SUM(views) AS "sum"
    FROM urls
    WHERE user_id = $1;`,
    [id]
  );
}

export const userDataRepository = {
  findOneById,
  getViewsSum,
};
