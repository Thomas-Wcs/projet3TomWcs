-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: projet3
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(100) DEFAULT NULL,
  `lien` varchar(100) DEFAULT NULL,
  `categorie_id` int DEFAULT NULL,
  `description_text` varchar(500) DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categorie_videos` (`categorie_id`),
  CONSTRAINT `fk_categorie_videos` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (1,'Vidéo de chatons mignons','https://www.youtube.com/watch?v=abcd1234',1,'Regardez ces adorables chatons jouer !','2022-01-01'),(2,'Vidéo de skateboard','https://www.youtube.com/watch?v=efgh5678',2,'Un skateur professionnel réalise des tricks impressionnants','2022-02-15'),(3,'Vidéo de recette de cuisine','https://www.youtube.com/watch?v=ijkl9012',3,'Apprenez à préparer une délicieuse tarte aux pommes','2022-03-10'),(4,'Vidéo de voyage en Thaïlande','https://www.youtube.com/watch\\\'?v=mnop3456',4,'Découvrez les plus beaux endroits de la Thaïlande','2022-04-20'),(5,'Compilation de fails','https://www.youtube.com/watch?v=123',2,'Les meilleurs fails de l\'année','2022-05-15'),(8,'Voyage en Grèce','https://www.youtube.com/watch?v=456',4,'Découvrez les merveilles de la Grèce','2022-06-05'),(9,'Vidéo de cuisine indienne','https://www.youtube.com/watch?v=abc',3,'Apprenez à préparer un curry indien délicieux','2022-07-01'),(11,'Vidéo de voyage en Australie','https://www.youtube.com/watch?v=ghi',4,'Découvrez les paysages époustouflants de l\'Australie','2022-09-15'),(12,'Vidéo de chatons qui jouent','https://www.youtube.com/watch?v=jkl',1,'Regardez ces adorables chatons jouer ensemble','2022-10-20');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-30 12:13:51
