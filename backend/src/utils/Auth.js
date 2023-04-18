const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOption = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  hashLength: 50,
  parallelism: 1,
};

const hashPassword = async (mdp) => {
  const hashed = await argon2
    .hash(mdp, hashingOption)
    .then((hashedPassword) => {
      return hashedPassword;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  return hashed;
};

const verifyPassword = async (req, res) => {
  argon2
    .verify(req.user.mdp, req.body.mdp)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { hashPassword, verifyPassword };
