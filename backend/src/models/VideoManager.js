const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(videos) {
    return this.database
      .query(
        `insert into ${this.table} (titre, lien, categorie_id, description_text) values ( ?, ?, ?, ?)`,
        [
          videos.titre,
          videos.lien,
          videos.categorie_id,
          videos.description_text,
        ]
      )
      .then(([result]) => result.insertId)
      .catch((err) => console.error(err));
  }

  update(videos) {
    return this.database.query(
      `update ${this.table} set titre = ? where id = ?`,
      [videos.name, videos.id]
    );
  }
}

module.exports = VideoManager;
