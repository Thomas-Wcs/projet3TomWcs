const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ name, email, mdp }) {
    return this.database
      .query("Select * from user where name = ?", [name])
      .then(([rows]) => {
        if (rows.length > 0) {
          return Promise.reject(new Error("User already exists"));
        }
        return this.database
          .query(
            `insert into ${this.table} (name, email, mdp) values (?, ?, ?)`,
            [name, email, mdp]
          )
          .then(([result]) => {
            return {
              id: result.insertId,
              name,
              email,
            };
          })
          .catch((err) => {
            console.error(err);
            return err.errno;
          });
      });
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set name = ?, email = ? where id = ?`,
      [user.name, user.email, user.id]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  login(email) {
    return this.database
      .query(`select * from ${this.table} where email = ?`, [email])
      .then(([user]) => user)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}

module.exports = UserManager;
