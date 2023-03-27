const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (name, mdp, email) values (?, ?, ?)`,
      [user.name, user.mdp, user.email]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set name = ?, mdp = ?, email = ? where id = ?`,
      [user.name, user.mdp, user.email, user.id]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = UserManager;
