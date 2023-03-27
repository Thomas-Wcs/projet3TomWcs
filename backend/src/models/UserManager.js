const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(item) {
    return this.database.query(
      `insert into ${this.table} (name, mdp, email) values (?, ?, ?)`,
      [item.name, item.mdp, item.email]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set name = ?, mdp = ?, email = ?, where id = ?`,
      [item.name, item.mdp, item.email, item.id]
    );
  }
}

module.exports = UserManager;
