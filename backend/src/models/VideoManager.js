const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(videos) {
    return this.database.query(
      `insert into ${this.table} (titre, lien, description_text, ) values (?, ?, ?)`,
      [videos.name]
    );
  }

  update(videos) {
    return this.database.query(
      `update ${this.table} set titre = ? where id = ?`,
      [videos.name, videos.id]
    );
  }
}

module.exports = VideoManager;
