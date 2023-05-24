const AbstractManager = require("./AbstractManager");

class VideoSectionManager extends AbstractManager {
  constructor() {
    super({ table: "video_section" });
  }

  findAll() {
    return this.database.query(
      `SELECT ${this.table}.*, videos.title, section.name from ${this.table} inner join videos on ${this.table}.video_id = videos.id inner join section on ${this.table}.section_id = section.id`
    );
  }

  insert(videoId, sectionId) {
    return this.database
      .query(`insert into ${this.table} (video_id, section_id) values (?, ?)`, [
        videoId,
        sectionId,
      ])

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
      .query(`delete from ${this.table} where video_id= ?`, [id])
      .then();
  }
}

module.exports = VideoSectionManager;
