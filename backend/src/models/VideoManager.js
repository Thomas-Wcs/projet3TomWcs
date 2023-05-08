const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.database
      .query(`SELECT v.id, v.title, v.link, v.description_text, v.date_publication, c.name as category_name
    FROM videos v
    INNER JOIN categorie c ON v.category_id = c.id;`);
  }

  insert(videos) {
    return this.database
      .query(
        `insert into ${this.table} (title, link, category_id, description_text, date_publication) values (?, ?, ?, ?, ?)`,
        [
          videos.title,
          videos.link,
          videos.category_id,
          videos.description_text,
          videos.date_publication,
        ]
      )
      .then(([result]) => result.insertId)
      .catch((err) => {
        throw err;
      });
  }

  update(id, videos) {
    return this.database
      .query(`update ${this.table} set  ? where id = ?`, [videos, id])
      .then(([result]) => result.affectedRows === 1)
      .catch((err) => {
        console.error(err);
      });
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = VideoManager;
