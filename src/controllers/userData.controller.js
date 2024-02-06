import { userDataService } from "../services/userData.service.js";

export default async function userData (req, res) {
    try {
        const { id } = res.locals.user

        const userData = userDataService.getOneById(id);

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

        const viewsSum = await userDataService.getViewsSum(id);

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


