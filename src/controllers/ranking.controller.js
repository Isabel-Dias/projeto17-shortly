import db from "../database/database.connection.js"

export default async function getRankings (req, res) {
    try {

        const ranking = await db.query(
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
        )

        console.log(ranking.rows);

        return res.status(200).send(ranking.rows)
    } catch (error) {
        return res.status(500).send(error)
    }
}
