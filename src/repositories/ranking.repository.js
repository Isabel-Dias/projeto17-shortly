import db from "../database/database.connection.js"

async function findAll() {
  return await db.query(
    `SELECT
          users.id,
          users.name,
          COUNT(urls.id) AS "linksCount",
          COALESCE(SUM(urls.views), 0) AS "visitCount"
      FROM users
      LEFT JOIN urls 
      ON users.id = urls.user_id
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10`
  );
}

export const rankingRepository = {
  findAll,
};
