const AbstractManager = require("./AbstractManager");

class SectionManager extends AbstractManager {
  constructor() {
    super({ table: "section" });
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.database.query(`select * from ${this.table}`);
  }

  insert(section) {
    return this.database.query(
      `insert into ${this.table} (id,name) values (?,?)`,
      [section.id, section.name]
    );
  }

  update(section) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [section.name, section.id]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = SectionManager;
