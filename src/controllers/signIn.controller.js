import { v4 as uuid } from "uuid";
import signInSchema from "../schemas/signIn.schema.js";
import { signInService } from "../services/signIn.service.js";

export async function signIn(req, res) {
  const { email, password } = req.body;
  const { comparePassword } = signInService;

  const validationSchema = signInSchema.validate(req.body);

  if (validationSchema.error) {
    return res.status(422).send({ message: "Dados inválidos!" });
  }

  const user = await signInService(email);

  if (user.rowCount == 0) {
    return res
      .status(401)
      .send({ message: "Usuário não cadastrado ou email incorreto" });
  }

  if (await comparePassword(password, user.rows[0].password)) {
    const token = uuid();
    const { id } = user.rows[0];

    signInService.postOne(token, id);

    return res.status(200).send({ token: token });
  } else {
    return res.status(401).send({ message: "Senha incorreta!" });
  }
}

export default signIn;
