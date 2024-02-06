import db from "../database/database.connection.js";

async function findOne(email) {
  return await db.query(
    `SELECT * 
    FROM users 
    WHERE email = $1`,
    [email]
  );
}

async function insertOne(name, email, passwordHash) {
  await db.query(
    `INSERT INTO users
    (name, email, password)
    VALUES
    ($1, $2, $3)`,
    [name, email, passwordHash]
  );
  return;
}

export const signUpRepository = {
  findOne,
  insertOne,
};
