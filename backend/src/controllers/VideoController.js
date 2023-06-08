/* eslint-disable camelcase */
const path = require("path");
const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.video
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.video
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readAll = (req, res) => {
  models.video
    .findAllFromEverything()
    .then(([rows]) => res.send(rows))
    .catch((err) => {
      console.error(err);
    });
};

const edit = async (req, res) => {
  const result = await models.video.update(
    parseInt(req.params.id, 10),
    req.body
  );
  if (result) {
    res.sendStatus(204);
  } else res.sendStatus(404);
};

const add = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { title, description_text, category_id, date_publication } = req.body;
  const { file } = req;
  if (!file) {
    return res.sendStatus(500);
  }

  const baseFolder = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    "videos"
  );
  const originalName = path.join(baseFolder, file.originalname);
  const filename = path.join(baseFolder, file.filename);

  fs.rename(filename, originalName, (err) => {
    if (err) res.status(500);
  });
  const link = `assets/videos/${file.originalname}`;

  // TODO validations (length, format...)
  try {
    const result = await models.video.insert({
      title,
      link,
      category_id,
      description_text,
      date_publication,
    });

    const newVideo = {
      title,

      description_text,
      category_id,
      link,
      date_publication,
      id: result,
    };
    return res.status(201).json(newVideo);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const destroy = async (req, res) => {
  await models.video
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findAllVideoAndFavorite = (req, res) => {
  const userId = req.params.id;
  models.video
    .findFavorites(userId)
    .then(([result]) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  findAllVideoAndFavorite,
  readAll,
};
