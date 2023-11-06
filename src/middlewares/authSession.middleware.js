import db from "../database/database.connection.js";

async function AuthSession(req, res, next) {

    const bearerToken = req.headers.authorization;
    let token = bearerToken?.replace('Bearer ', '');
    
    token = token.replace('"', "")
    token = token.replace('"', "")
    
    if (!token) {
        return res.status(401).send({ message: "Não autorizado, token não recebido" });
    }

    try {

        const session = await db.query(
            `SELECT * FROM sessions
            WHERE "token" = $1`, [token]
        )

        if (session.rowCount == 0) {
            return res.status(401).send({ message: "Não autorizado, sessão não cadastrada" });
        }

        const id = session.rows[0].user_id

        const user = await db.query(
            `SELECT * 
            FROM users
            WHERE id = $1` , [id]
        )

        if(user.rowCount == 0){
            return res.status(401).send({message: "Usuário não existe!"});
        }

        res.locals.user = {id}

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export default AuthSession; 