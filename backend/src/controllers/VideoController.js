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

const edit = (req, res) => {
  const videos = req.body;

  videos.id = parseInt(req.params.id, 10);

  models.video
    .update(videos)
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

const add = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { titre, description_text, categorie_id } = req.body;
  const { file } = req;
  if (!file) {
    return res.sendStatus(500);
  }
  const lien = `videos/${file.originalname}`;

  // TODO validations (length, format...)

  const result = await models.video.insert(
    titre,
    description_text,
    categorie_id,
    lien
  );
  const newVideo = {
    titre,
    // eslint-disable-next-line camelcase
    description_text,
    // eslint-disable-next-line camelcase
    categorie_id,
    lien,
    id: result,
  };
  return res.status(201).json(newVideo);
};

const destroy = (req, res) => {
  models.videos
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

const findFavorites = async (req, res) => {
  await models.video
    .findFavorites(req.query.name)
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
  findFavorites,
};
