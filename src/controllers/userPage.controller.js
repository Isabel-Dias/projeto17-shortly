import db from "../database/database.connection"

async function userPage (req, res) {
    try {
        const { user_id } = res.locals.user
        userData = await db.query(
            `SELECT users.name, urls.*
            FROM users
            JOIN urls 
            ON users.id = urls.user_id
            WHERE users.id = $1`, [user_id]
        )

        const urlsList = userData.rows.map(url => {
            return (
                {
                    id: url.id,
			        shortUrl: url.short_url,
			        url: url.url_link,
			        visitCount: url.views_count
                }
            )
        })

        const viewsSum = await db.query(
            `SELECT SUM(views_count) AS "sum" 
            FROM urls
            WHERE id = $1`, [user_id]
        )

        const { name } = userData.rows[0]

        const resData = {
            id: user.user_id,
	        name: name,
	        visitCount: viewsSum.sum,
	        shortenedUrls: urlsList
        } 

        return res.status(200).send(resData)

    } catch (error) {
        return res.sendStatus(500)
    }
}

export default userPage
