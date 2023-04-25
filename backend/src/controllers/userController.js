const joi = require("joi");
const models = require("../models");
const { hashPassword } = require("../utils/Auth");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      name: joi.string().max(45).presence(presence),
      email: joi.string().email().presence(presence),
      mdp: joi.string().max(255).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.user
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
  const id = parseInt(req.params.id, 10);
  models.user
    .find(id)
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
  const user = req.body;

  // TODO validations (length, format...)

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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
  const error = validate(req.body);
  if (error) {
    return res.sendStatus(422);
  }
  const { name, email, mdp } = req.body;
  const hashed = await hashPassword(mdp);
  if (!hashed) {
    return res.sendStatus(500);
  }
  try {
    const result = await models.user.insert({
      name,
      email,
      mdp: hashed,
    });

    return res.status(201).json(result);
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(409).send("User already exists");
    }
    console.error(err);
    return res.sendStatus(500);
  }
};

const destroy = (req, res) => {
  models.user
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

const findOne = async (req, res) => {
  models.user.find(req.query.name).then(([result]) => {
    res.json(result);
  });
};

const login = async (req, res, next) => {
  const { email } = req.body;
  if (!email) res.sendStatus(422);
  const result = await models.user.login(email);
  if (result) {
    const [firstResult] = result;
    if (firstResult != null) {
      req.user = firstResult;
      next();
    } else return res.sendStatus(401);
  } else return res.sendstatus(500);
  console.log(result);
  return true;
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  findOne,
};
