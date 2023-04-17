const argon2 = require("argon2");

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

module.exports = { hashPassword };
