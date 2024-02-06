import { urlsRepository } from "../repositories/urls.repository.js";
import urlSchema from "../schemas/url.schema.js";
import { urlsService } from "../services/urls.service.js";

export async function postUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;

  const validationSchema = urlSchema.validate(req.body);

  if (validationSchema.error) {
    return res.status(422).send({ message: "URL em formato inválido" });
  }

  try {
    const urlRes = await urlsService.postOne(id, url);
    return res.status(201).send(urlRes);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function getOneUrl(req, res) {
  try {
    const { id } = req.params;

    const urlById = urlsService.getOneById(id);

    if (urlById.rowCount == 0) {
      return res.status(404).send({ message: "URL não existe!" });
    }

    const urlData = {
      id: id,
      shortUrl: urlById.rows[0].short_url,
      url: urlById.rows[0].url,
    };

    return res.status(200).send(urlData);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function openUrl(req, res) {
  try {
    const { shortUrl } = req.params;

    const urlData = await urlsService.getOneByShortUrl(shortUrl);

    if (urlData.rowCount == 0) {
      return res.status(404).send({ message: "Essa shortURL não existe!" });
    }

    const increasedCount = Number(urlData.rows[0].views) + 1;
    const { id, url } = urlData.rows[0];

    await urlsService.updateOne(increasedCount, id);

    return res.redirect(url);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function deleteUrl(req, res) {
  try {
    const userId = res.locals.user.id;
    const urlId = req.params.id;

    const url = await urlsService.getOneById(urlId);

    if (url.rowCount == 0) {
      return res.status(404).send({ message: "Url não existe!" });
    }
    const urlUserId = result.rows[0].user_id;

    await urlsService.deleteOne(urlId);

    if (urlUserId != userId) {
      return res
        .status(401)
        .send({ message: "Essa URL não pertence ao usuário!" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
}
