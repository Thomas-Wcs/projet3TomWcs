const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.database.query(
      `select ${this.table}.*, categorie.name, section.name from videos inner join categorie on ${this.table}.category_id = categorie.id inner join video_section on ${this.table}.id = video_section.video_id inner join section where video_section.section_id = section.id;`
    );
  }

  insert(videos) {
    return this.database
      .query(
        `insert into ${this.table} (title, link, category_id, description_text, date_publication, isVideoPremium, isVideoPaying) values (?, ?, ?, ?, ?, ?, ?)`,
        [
          videos.title,
          videos.link,
          videos.category_id,
          videos.description_text,
          videos.date_publication,
          videos.isVideoPremium,
          videos.isVideoPaying,
        ]
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  findFavorites(userId) {
    return this.database
      .query(
        `SELECT videos.*, categorie.name, videos_user.user_id
        FROM videos
        INNER JOIN categorie ON videos.category_id = categorie.id
        LEFT JOIN videos_user ON videos.id = videos_user.videos_id
        where user_id = ? or user_id is NULL
        ;`,
        [userId]
      )
      .catch((err) => {
        console.error(err);
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
    return this.database
      .query("delete from video_section where video_id= ?", [id])
      .then(() => {
        return this.database.query(`delete from ${this.table} where id = ?`, [
          id,
        ]);
      });
  }
}

module.exports = VideoManager;
