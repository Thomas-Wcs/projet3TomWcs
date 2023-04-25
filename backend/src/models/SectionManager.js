const AbstractManager = require("./AbstractManager");

class SectionManager extends AbstractManager {
  constructor() {
    super({ table: "section" });
  }

  findAll() {
    return this.database.query(`select * from ${this.table}`);
  }
}

module.exports = SectionManager;
