const models = require("../models");

const browse = (req, res) => {
  models.videos_user
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
  models.videos_user
    .read(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const insert = (req, res) => {
  const { userId, videoId } = req.body;
  models.videos_user.insert({ userId, videoId }).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
};

const destroy = (req, res) => {
  models.videos_user
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

module.exports = {
  browse,
  read,
  destroy,
  insert,
};
