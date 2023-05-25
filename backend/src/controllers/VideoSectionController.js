const path = require("path");
const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.videoSection
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
  models.videoSection
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

const add = async (req, res) => {
  // TODO validations (length, format...)

  const { title, description_text, category_id, date_publication, section_id } =
    req.body;

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

    const insertVideoId = result[0].insertId;
    const sectionArray = section_id.split(",");

    sectionArray.forEach((sect) => {
      models.videoSection.insert(insertVideoId, sect).catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    });

    res.status(201);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const destroy = async (req, res) => {
  await models.videoSection
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
  add,
  destroy,
  read,
};
