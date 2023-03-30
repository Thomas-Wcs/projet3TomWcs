const AbstractManager = require("./AbstractManager");

class VideosManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  insert(videos) {
    return this.database.query(
      `insert into ${this.table} (titre, lien, categorie_id, description_text, date_publication) values (?, ?, ?, ?, ?)`,
      [
        videos.titre,
        videos.lien,
        videos.categorie_id,
        videos.description_text,
        videos.date_publication,
      ]
    );
  }

  update(videos) {
    return this.database.query(
      `update ${this.table} set titre = ?, lien = ?, categorie_id = ?, description_text = ?, date_publication = ? where id = ?`,
      [
        videos.titre,
        videos.lien,
        videos.categorie_id,
        videos.description_text,
        videos.date_publication,
      ]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = VideosManager;
