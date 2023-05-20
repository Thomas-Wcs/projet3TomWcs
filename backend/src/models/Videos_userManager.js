const AbstractManager = require("./AbstractManager");

class VideosUserManager extends AbstractManager {
  constructor() {
    super({ table: "videos_user" });
  }

  read(id) {
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

  insert({ userId, videoId }) {
    return this.database
      .query(` insert into videos_user (user_id, videos_id) values (?, ?)`, [
        userId,
        videoId,
      ])
      .catch((err) => {
        console.error(err);
        return err.errno;
      });
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

module.exports = VideosUserManager;
