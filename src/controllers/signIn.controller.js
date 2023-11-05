import db from "../database/database.connection.js";
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"
import signInSchema from "../schemas/signIn.schema.js";

export async function signIn(req, res) {
    const { email, password } = req.body;

    const validationSchema = signInSchema.validate(req.body);

    if(validationSchema.error){
        return res.status(422).send({message: "Dados inválidos!"})
    }
        
    const user = await db.query(`SELECT * 
        FROM users
        WHERE email = $1;`, [email]
    )
    
    if(user.rowCount == 0) {
        return res.status(401).send({message: "Usuário não cadastrado ou email incorreto"})
    }
        
    if(bcrypt.compareSync(password, user.rows[0].password)) {
        const token = uuid();
        const{ id } = user.rows[0];

        await db.query(
            `INSERT INTO sessions
            (token, user_id)
            VALUES ($1, $2);`, [token, id]
        ) 
        
        return res.status(200).send({token: token});
    } else {
        return res.status(401).send({message: "Senha incorreta!"});
    }
};

export default signIn;