const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  // eslint-disable-next-line camelcase
  insert(titre, lien, categorie_id, description_text) {
    return this.database
      .query(
        `insert into ${this.table} (titre, lien, categorie_id, description_text) values ( ?, ?, ?, ?)`,
        // eslint-disable-next-line camelcase
        [titre, lien, categorie_id, description_text]
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

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = VideoManager;
