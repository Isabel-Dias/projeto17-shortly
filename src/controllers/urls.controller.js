import { nanoid } from "nanoid"
import db from "../database/database.connection.js"
import urlSchema from "../schemas/url.schema.js"

export async function postUrl (req, res) {
    const { id } = res.locals.user
    const { url } = req.body
    const shortUrl = nanoid(8)

    const validationSchema = urlSchema.validate(req.body);

    if(validationSchema.error){
        return res.status(422).send({message: "URL em formato inválido"})
    }

    try {

        await db.query(`
        INSERT INTO urls
        (user_id, url, short_url)
        VALUES
        ($1, $2, $3)`, [id, url, shortUrl]
        )
    
        const urlRes = {
            id: id,
            shortUrl: shortUrl
        }
        
        return res.status(201).send(urlRes)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function getOneUrl(req, res) {
    try {
        const { id } = req.params;
        
        const urlById = await db.query(`
        SELECT * FROM urls
        WHERE 
        id = $1;`, [id]
        )

        if(urlById.rowCount == 0) {
            return res.status(404).send({message: "URL não existe!"})
        }
        
        const urlData = {
            id: id,
	        shortUrl: urlById.rows[0].short_url,
	        url: urlById.rows[0].url
        }

        return res.status(200).send(urlData)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function openUrl(req, res) {
    try {
       const { shortUrl }  = req.params;

       const urlData = await db.query(`
       SELECT *
       FROM urls
       WHERE short_url = $1`, [shortUrl]
       )

       if(urlData.rowCount == 0) {
        return res.status(404).send({message: "Essa shortURL não existe!"})
       }

       const increasedCount = Number(urlData.rows[0].views) + 1 
       const { id, url } = urlData.rows[0]

       await db.query(
        `UPDATE urls 
        SET views = $1
        WHERE id = $2`, [increasedCount, id]
       )

       return res.redirect(url)

    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}


