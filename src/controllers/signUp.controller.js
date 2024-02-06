import signUpSchema from "../schemas/signUp.schema.js";
import { signUpService } from "../services/signUp.service.js";

async function signUp(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await signUpService.getOne(email);

    if (user.rowCount != 0) {
      return res.status(409).send({ message: "Email já cadastrado!" });
    }

    const validationSchema = signUpSchema.validate(req.body);

    if (validationSchema.error) {
      return res
        .status(422)
        .send({ message: "Todos os campos são obrigatórios" });
    }

    if (password !== confirmPassword) {
      return res
        .status(422)
        .send({ message: "A senha digitada e sua confirmação não são iguais" });
    }

    await signUpService.postOne(name, email, password);

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default signUp;
