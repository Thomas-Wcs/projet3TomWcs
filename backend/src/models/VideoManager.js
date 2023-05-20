const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.database.query(`
      select ${this.table}.*, categorie.name from videos  inner join categorie on ${this.table}.category_id = categorie.id;`);
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

  findV(id) {
    return this.database.query(
      `SELECT videos.*, categorie.name, user.id
    FROM videos
    INNER JOIN categorie ON videos.category_id = categorie.id
    INNER JOIN videos_user ON videos.id = videos_user.videos_id
    INNER JOIN user ON videos_user.user_id = user.id
    WHERE user.id = ?;`,
      [id]
    );
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
