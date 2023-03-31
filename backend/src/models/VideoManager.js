const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  insert(videos) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      videos.name,
    ]);
  }

  update(videos) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [videos.name, videos.id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }
}

module.exports = VideoManager;
