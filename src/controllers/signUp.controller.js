import db from "../database/database.connection.js";
import signUpSchema from "../schemas/signUp.schema.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {

    try {
        const {name, email, password, confirmPassword} = req.body;

        const result = await db.query(
            `SELECT * 
            FROM users 
            WHERE email = $1`, 
           [email]
       )
       
       if(result.rowCount != 0) {
            return res.status(409).send({message: "Email já cadastrado!"})
        }

        const validationSchema = signUpSchema.validate(req.body);

       if(validationSchema.error){
            return res.status(422).send({message: "Todos os campos são obrigatórios"})
        }
     
        if(password !== confirmPassword) {
        return res.status(422).send({message: "A senha digitada e sua confirmação não são iguais"})
        } 

        const passwordHash = bcrypt.hashSync(password, 10);
 
        await db.query(
            `
            INSERT INTO users
            (name, email, password)
            VALUES
            ($1, $2, $3)
            `, [name, email, passwordHash]
        )
 
        return res.sendStatus(201)
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export default signUp 
