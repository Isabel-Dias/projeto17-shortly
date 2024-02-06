import db from "../database/database.connection.js";

async function findOne(email) {
  return (user = await db.query(
    `SELECT * 
        FROM users
        WHERE email = $1;`,
    [email]
  ));
}

async function insertOne(token, id) {
  await db.query(
    `INSERT INTO sessions
          (token, user_id)
          VALUES ($1, $2);`,
    [token, id]
  );
}

export const signInRepository = {
  findOne,
  insertOne
};
