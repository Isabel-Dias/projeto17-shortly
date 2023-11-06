import db from "../database/database.connection.js"

export default async function userData (req, res) {
    try {
        const { id } = res.locals.user
        
        userData = await db.query(
            `SELECT users.name, urls.*
            FROM users
            JOIN urls 
            ON users.id = urls.user_id
            WHERE users.id = $1;`, [id]
        )

        const { name } = userData.rows[0];

        const urlsList = userData.rows.map(url => {
           return (
                {
                    id: url.id,
                    shortUrl: url.short_url,
                    url: url.url,
		            visitCount: url.views
                }
            )
        })

        const viewsSum = await db.query(
            `SELECT SUM(views) AS "sum"
            FROM urls

            WHERE user_id = $1;`, [id]
        )

        const { sum } = viewsSum.rows[0]

        const resData = {
            id: id,
	        name: name,
            visitCount: Number(sum),
	        shortenedUrls: urlsList
        } 

        return res.status(200).send(resData)

    } catch (error) {
        return res.status(500).send(error)
    }
}


