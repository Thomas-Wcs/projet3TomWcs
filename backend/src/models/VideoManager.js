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
        `insert into ${this.table} (title, link, category_id, description_text, date_publication) values (?, ?, ?, ?, ?)`,
        [
          videos.title,
          videos.link,
          videos.category_id,
          videos.description_text,
          videos.date_publication,
        ]
      )
      .then(([result]) => {
        const videoId = result.insertId;

        return this.database.query(
          `insert into video_section (video_id) values (?)`,
          [videoId]
        );
      })
      .then((res) => {
        return res;
      })
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
