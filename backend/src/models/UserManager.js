const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(item) {
    return this.database.query(
      `insert into ${this.table} (name, mdp, email) values (?, ?, ?)`,
      [item.title]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = UserManager;
