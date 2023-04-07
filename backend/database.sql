/* CREATE TABLE item (
 id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
 title varchar(255) NOT NULL
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 INSERT INTO item (title) VALUES ('Stuff'), ('Doodads'); */

ALTER TABLE videos_user DROP FOREIGN KEY FK_videos_user;

----------- A EXECUTER EN DEUX ETAPES

ALTER TABLE videos_user
ADD
    CONSTRAINT FK_videos_user FOREIGN KEY (videos_id) REFERENCES videos (id) ON DELETE CASCADE;

(modifié) 