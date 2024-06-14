CREATE DATABASE  IF NOT EXISTS `abm_ispc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `abm_ispc`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: abm_ispc
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (3,'ADMINAR_USUARIO'),(1,'ADMINISTRAR_PRODUCTOS'),(2,'comprar_productos'),(4,'dashboard_view');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
INSERT INTO `auth_group_permissions` VALUES (1,1,49),(2,1,50),(3,1,51),(4,1,52),(6,2,37),(7,2,38),(8,2,39),(5,2,40),(10,3,29),(11,3,30),(12,3,31),(9,3,32),(14,4,69),(15,4,70),(16,4,71),(13,4,72);
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add Token',6,'add_token'),(22,'Can change Token',6,'change_token'),(23,'Can delete Token',6,'delete_token'),(24,'Can view Token',6,'view_token'),(25,'Can add Token',7,'add_tokenproxy'),(26,'Can change Token',7,'change_tokenproxy'),(27,'Can delete Token',7,'delete_tokenproxy'),(28,'Can view Token',7,'view_tokenproxy'),(29,'Can add usuario',8,'add_customuser'),(30,'Can change usuario',8,'change_customuser'),(31,'Can delete usuario',8,'delete_customuser'),(32,'Can view usuario',8,'view_customuser'),(33,'Can add Barrio',9,'add_barrio'),(34,'Can change Barrio',9,'change_barrio'),(35,'Can delete Barrio',9,'delete_barrio'),(36,'Can view Barrio',9,'view_barrio'),(37,'Can add Compra',10,'add_compra'),(38,'Can change Compra',10,'change_compra'),(39,'Can delete Compra',10,'delete_compra'),(40,'Can view Compra',10,'view_compra'),(41,'Can add Localidad',11,'add_localidad'),(42,'Can change Localidad',11,'change_localidad'),(43,'Can delete Localidad',11,'delete_localidad'),(44,'Can view Localidad',11,'view_localidad'),(45,'Can add Permiso',12,'add_permiso'),(46,'Can change Permiso',12,'change_permiso'),(47,'Can delete Permiso',12,'delete_permiso'),(48,'Can view Permiso',12,'view_permiso'),(49,'Can add Producto',13,'add_producto'),(50,'Can change Producto',13,'change_producto'),(51,'Can delete Producto',13,'delete_producto'),(52,'Can view Producto',13,'view_producto'),(53,'Can add Rol',14,'add_rol'),(54,'Can change Rol',14,'change_rol'),(55,'Can delete Rol',14,'delete_rol'),(56,'Can view Rol',14,'view_rol'),(57,'Can add Rol_Permiso',15,'add_rol_permiso'),(58,'Can change Rol_Permiso',15,'change_rol_permiso'),(59,'Can delete Rol_Permiso',15,'delete_rol_permiso'),(60,'Can view Rol_Permiso',15,'view_rol_permiso'),(61,'Can add Pedido',16,'add_pedido'),(62,'Can change Pedido',16,'change_pedido'),(63,'Can delete Pedido',16,'delete_pedido'),(64,'Can view Pedido',16,'view_pedido'),(65,'Can add Direccion',17,'add_direccion'),(66,'Can change Direccion',17,'change_direccion'),(67,'Can delete Direccion',17,'delete_direccion'),(68,'Can view Direccion',17,'view_direccion'),(69,'Can add Detalle',18,'add_detalle'),(70,'Can change Detalle',18,'change_detalle'),(71,'Can delete Detalle',18,'delete_detalle'),(72,'Can view Detalle',18,'view_detalle');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barrio`
--

DROP TABLE IF EXISTS `barrio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barrio` (
  `id_barrio` int NOT NULL AUTO_INCREMENT,
  `nombre_barrio` varchar(50) NOT NULL,
  `localidad_id` int NOT NULL,
  PRIMARY KEY (`id_barrio`),
  KEY `barrio_localidad_id_022a2ddb_fk_localidad_id_localidad` (`localidad_id`),
  CONSTRAINT `barrio_localidad_id_022a2ddb_fk_localidad_id_localidad` FOREIGN KEY (`localidad_id`) REFERENCES `localidad` (`id_localidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barrio`
--

LOCK TABLES `barrio` WRITE;
/*!40000 ALTER TABLE `barrio` DISABLE KEYS */;
/*!40000 ALTER TABLE `barrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id_compra` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `descripcion` longtext NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id_compra`),
  KEY `compra_user_id_04314f70_fk_usuario_id` (`user_id`),
  CONSTRAINT `compra_user_id_04314f70_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (2,'2024-06-14','LAMBHAUS',8250.00,6),(3,'2024-06-14','',4450.00,6),(4,'2024-06-14','TASTY RICCA',4900.00,6);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle`
--

DROP TABLE IF EXISTS `detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle` (
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precio_calculado` decimal(10,2) NOT NULL,
  `compra_id` int NOT NULL,
  `producto_id` int NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `detalle_compra_id_552bc696_fk_compra_id_compra` (`compra_id`),
  KEY `detalle_producto_id_6b1e1f62_fk_producto_id_producto` (`producto_id`),
  CONSTRAINT `detalle_compra_id_552bc696_fk_compra_id_compra` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`id_compra`),
  CONSTRAINT `detalle_producto_id_6b1e1f62_fk_producto_id_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle`
--

LOCK TABLES `detalle` WRITE;
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
INSERT INTO `detalle` VALUES (2,2,8250.00,2,6),(3,2,6500.00,2,8),(4,2,6500.00,2,9);
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion`
--

DROP TABLE IF EXISTS `direccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direccion` (
  `id_direccion` int NOT NULL AUTO_INCREMENT,
  `calle` varchar(100) NOT NULL,
  `numero` decimal(10,2) NOT NULL,
  `barrio_id` int NOT NULL,
  PRIMARY KEY (`id_direccion`),
  KEY `direccion_barrio_id_d9efd4e9_fk_barrio_id_barrio` (`barrio_id`),
  CONSTRAINT `direccion_barrio_id_d9efd4e9_fk_barrio_id_barrio` FOREIGN KEY (`barrio_id`) REFERENCES `barrio` (`id_barrio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion`
--

LOCK TABLES `direccion` WRITE;
/*!40000 ALTER TABLE `direccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `direccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_usuario_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-06-13 23:10:12.608946','1','AMERICAN',1,'[{\"added\": {}}]',13,1),(2,'2024-06-13 23:10:52.990159','2','',1,'[{\"added\": {}}]',8,1),(3,'2024-06-13 23:11:03.629354','2','mica@gmail.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email\", \"Staff status\"]}}]',8,1),(4,'2024-06-13 23:11:27.339356','1','1',1,'[{\"added\": {}}]',10,1),(5,'2024-06-13 23:11:50.539060','1','1, 3900',1,'[{\"added\": {}}]',18,1),(6,'2024-06-13 23:14:16.053821','3','',1,'[{\"added\": {}}]',8,1),(7,'2024-06-13 23:14:31.761123','3','mica@example.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email\", \"Staff status\"]}}]',8,1),(8,'2024-06-13 23:16:53.273396','4','',1,'[{\"added\": {}}]',8,1),(9,'2024-06-13 23:17:17.768897','4','cala@cala.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email\"]}}]',8,1),(10,'2024-06-14 13:15:04.162547','1','ADMINISTRAR_PRODUCTOS',1,'[{\"added\": {}}]',3,1),(11,'2024-06-14 13:15:21.742725','3','mica@example.com',2,'[{\"changed\": {\"fields\": [\"Username\", \"Last name\", \"Groups\"]}}]',8,1),(12,'2024-06-14 13:17:55.815592','2','comprar_productos',1,'[{\"added\": {}}]',3,1),(13,'2024-06-14 13:18:24.297385','4','usuario@gmail.com',2,'[{\"changed\": {\"fields\": [\"Username\", \"First name\", \"Last name\", \"Email\", \"Groups\"]}}]',8,1),(14,'2024-06-14 13:21:37.070410','4','usuario@gmail.com',3,'',8,1),(15,'2024-06-14 13:21:42.312543','2','mica@gmail.com',3,'',8,1),(16,'2024-06-14 13:21:47.062583','3','mica@example.com',3,'',8,1),(17,'2024-06-14 13:24:34.022371','5','',1,'[{\"added\": {}}]',8,1),(18,'2024-06-14 13:26:04.732061','3','ADMINAR_USUARIO',1,'[{\"added\": {}}]',3,1),(19,'2024-06-14 13:26:18.062330','5','admin@gmail.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email\", \"Staff status\", \"Groups\"]}}]',8,1),(20,'2024-06-14 13:26:44.435347','6','',1,'[{\"added\": {}}]',8,1),(21,'2024-06-14 13:29:21.982442','4','dashboard_view',1,'[{\"added\": {}}]',3,1),(22,'2024-06-14 13:29:26.882551','6','usuario@gmail.com',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Email\", \"Groups\"]}}]',8,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(6,'authtoken','token'),(7,'authtoken','tokenproxy'),(4,'contenttypes','contenttype'),(9,'ricco_app','barrio'),(10,'ricco_app','compra'),(8,'ricco_app','customuser'),(18,'ricco_app','detalle'),(17,'ricco_app','direccion'),(11,'ricco_app','localidad'),(16,'ricco_app','pedido'),(12,'ricco_app','permiso'),(13,'ricco_app','producto'),(14,'ricco_app','rol'),(15,'ricco_app','rol_permiso'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-06-13 21:34:55.887579'),(2,'contenttypes','0002_remove_content_type_name','2024-06-13 21:34:55.984057'),(3,'auth','0001_initial','2024-06-13 21:34:56.337405'),(4,'auth','0002_alter_permission_name_max_length','2024-06-13 21:34:56.415127'),(5,'auth','0003_alter_user_email_max_length','2024-06-13 21:34:56.437607'),(6,'auth','0004_alter_user_username_opts','2024-06-13 21:34:56.445946'),(7,'auth','0005_alter_user_last_login_null','2024-06-13 21:34:56.453769'),(8,'auth','0006_require_contenttypes_0002','2024-06-13 21:34:56.461952'),(9,'auth','0007_alter_validators_add_error_messages','2024-06-13 21:34:56.474998'),(10,'auth','0008_alter_user_username_max_length','2024-06-13 21:34:56.486377'),(11,'auth','0009_alter_user_last_name_max_length','2024-06-13 21:34:56.494710'),(12,'auth','0010_alter_group_name_max_length','2024-06-13 21:34:56.522522'),(13,'auth','0011_update_proxy_permissions','2024-06-13 21:34:56.534724'),(14,'auth','0012_alter_user_first_name_max_length','2024-06-13 21:34:56.543086'),(15,'ricco_app','0001_initial','2024-06-13 21:34:57.907832'),(16,'admin','0001_initial','2024-06-13 21:34:58.083927'),(17,'admin','0002_logentry_remove_auto_add','2024-06-13 21:34:58.104146'),(18,'admin','0003_logentry_add_action_flag_choices','2024-06-13 21:34:58.115976'),(19,'authtoken','0001_initial','2024-06-13 21:34:58.233299'),(20,'authtoken','0002_auto_20160226_1747','2024-06-13 21:34:58.280740'),(21,'authtoken','0003_tokenproxy','2024-06-13 21:34:58.288329'),(22,'authtoken','0004_alter_tokenproxy_options','2024-06-13 21:34:58.296395'),(23,'sessions','0001_initial','2024-06-13 21:34:58.351326');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('vrok0zeh4xajdizd2hexp41mrvb51mya','.eJxVjDsOwjAQBe_iGlk2_i4lfc5geXcdHECOFCcV4u4QKQW0b2beS6S8rTVtvSxpYnERVpx-N8z0KG0HfM_tNkua27pMKHdFHrTLYebyvB7u30HNvX7rEAGcicZ7hlzCGTF4B5Yo6qC1YQXRAEAMqMDjqDw6RqbROg2ElMX7A7fdN3E:1sHthL:W1Qqe-WjcB84bCf6jriNFJQZqU9HKtnAwrhu6rXx95Y','2024-06-27 23:17:39.492792'),('z1yjoioejznfe8scjvmrv6ihe7ja32kw','.eJxVzM0OwiAQBOB34WyIy5afevTuM5AFtlI1kJT2ZHx3adKDXme-mbfwtK3Zb40XPydxESBOv1mg-OSyF-lB5V5lrGVd5iB3Io-2yVtN_Loe9u8gU8t9PQWrMI1nayBphwoNj4MlrbQmZUAbF01AVsEZ1gDYebeOcHI4WATx-QKwBTYr:1sHs7s:8JLVEcRQU_fFlrNiR7wdw_wEuKRndGy2xZPdcGsihE8','2024-06-27 21:36:56.548664');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `id_localidad` int NOT NULL AUTO_INCREMENT,
  `nombre_localidad` varchar(50) NOT NULL,
  `cod_postal` int NOT NULL,
  PRIMARY KEY (`id_localidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha_pedido` date NOT NULL,
  `estado` varchar(50) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `Pedido_user_id_6d6e5b0c_fk_usuario_id` (`user_id`),
  CONSTRAINT `Pedido_user_id_6d6e5b0c_fk_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `id_permiso` int NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  PRIMARY KEY (`id_permiso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'AMERICAN','Pan casero.Burger de carne 200gr. Queso cheddar fundido con panceta crocante y huevo a la plancha',3900.00),(2,'KING KONG BURGER','Para compartir! 6/8 porciones. Impresionante Burger XXL de 1kg, de carne, con queso cheddar fundido, lechuga, tomate y panceta crocante',4500.00),(3,'TASTY RICCA','Pan casero. Burger de carne 220gr. Queso cheddar fundido, lechuga, tomate huevo planchado, panceta crocante y cebolla asada',2450.00),(4,'LOUIS HONOR','Pan casero. Doble burger de carne 200gr. Queso azul fundido.Cebolla caramelizada. Panceta crocante. Champignones asados. Rúcula',4100.00),(5,'RICCA','Pan casero. Burger de carne 200gr. Queso muzzarella fundido. Aros de cebolla fritos. Panceta crocante. Guacamole',3250.00),(6,'LAMBHAUS','Pan casero. Burger de cordero 190gr. Queso brie fundido con frutos secos. Cebolla al malbec',2780.00),(7,'LAMBHAUS','Pan casero. Burger de cordero 190gr. Queso brie fundido con frutos secos. Cebolla al malbec',2780.00),(8,'DOUBLE CHEESE & BACON','Pan casero. Doble burger de carne 200gr. Doble queso cheddar. Panceta. Cebolla',4450.00),(9,'LASSEN WURST','Pan ciabatta de aceitunas. Sandwich de chorizo alemán 140gr. Queso dambo fundido. Cebolla caramelizada. Panceta crocante',3450.00);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_permiso`
--

DROP TABLE IF EXISTS `rol_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_permiso` (
  `id_rol_permiso` int NOT NULL AUTO_INCREMENT,
  `permiso_id` int NOT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id_rol_permiso`),
  KEY `Rol_Permiso_permiso_id_b3e07810_fk_Permiso_id_permiso` (`permiso_id`),
  KEY `Rol_Permiso_rol_id_51d744e6_fk_rol_id_rol` (`rol_id`),
  CONSTRAINT `Rol_Permiso_permiso_id_b3e07810_fk_Permiso_id_permiso` FOREIGN KEY (`permiso_id`) REFERENCES `permiso` (`id_permiso`),
  CONSTRAINT `Rol_Permiso_rol_id_51d744e6_fk_rol_id_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_permiso`
--

LOCK TABLES `rol_permiso` WRITE;
/*!40000 ALTER TABLE `rol_permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol_permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion_id` int DEFAULT NULL,
  `rol_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `usuario_direccion_id_4d2cc5e4_fk_direccion_id_direccion` (`direccion_id`),
  KEY `usuario_rol_id_ac58b608_fk_rol_id_rol` (`rol_id`),
  CONSTRAINT `usuario_direccion_id_4d2cc5e4_fk_direccion_id_direccion` FOREIGN KEY (`direccion_id`) REFERENCES `direccion` (`id_direccion`),
  CONSTRAINT `usuario_rol_id_ac58b608_fk_rol_id_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'pbkdf2_sha256$600000$cNPwWyTgRRoIZh53OYd4Es$VWqHIswh9YauuQmLZdDSW+AB7n9/vzIfyRWnkGjZbIg=','2024-06-13 21:36:56.540652',1,'superuser','','',1,1,'2024-06-13 21:35:34.586397','cosmarian@gmail.com',NULL,NULL,NULL),(5,'pbkdf2_sha256$600000$CkkluMosiJGo5xTITwUjha$gmGal2qM8PrtcL4B5Ln0aIfmQdoMhzie/xucHmEcj2o=',NULL,0,'Admin','admin','comun',1,1,'2024-06-14 13:24:33.000000','admin@gmail.com',NULL,NULL,NULL),(6,'pbkdf2_sha256$600000$SkHdEbEtXOvUoLc9vK2Yt2$vGfCw+vREVVaDfS/NWr730EDN/mHt2SksDkWqDmSAjU=',NULL,0,'usuario','usuario','comun',0,1,'2024-06-14 13:26:43.000000','usuario@gmail.com',NULL,NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_groups`
--

DROP TABLE IF EXISTS `usuario_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_groups_customuser_id_group_id_18e8ca87_uniq` (`customuser_id`,`group_id`),
  KEY `usuario_groups_group_id_c67c8651_fk_auth_group_id` (`group_id`),
  CONSTRAINT `usuario_groups_customuser_id_dae56c50_fk_usuario_id` FOREIGN KEY (`customuser_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `usuario_groups_group_id_c67c8651_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_groups`
--

LOCK TABLES `usuario_groups` WRITE;
/*!40000 ALTER TABLE `usuario_groups` DISABLE KEYS */;
INSERT INTO `usuario_groups` VALUES (3,5,1),(4,5,3),(5,6,2),(6,6,4);
/*!40000 ALTER TABLE `usuario_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_user_permissions`
--

DROP TABLE IF EXISTS `usuario_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_user_permissions_customuser_id_permission_956f0d16_uniq` (`customuser_id`,`permission_id`),
  KEY `usuario_user_permiss_permission_id_a8893ce7_fk_auth_perm` (`permission_id`),
  CONSTRAINT `usuario_user_permiss_permission_id_a8893ce7_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `usuario_user_permissions_customuser_id_f3811ba0_fk_usuario_id` FOREIGN KEY (`customuser_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_user_permissions`
--

LOCK TABLES `usuario_user_permissions` WRITE;
/*!40000 ALTER TABLE `usuario_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 11:17:47

---MysqlWorkbrench version 8.4---

------(superuser, 'cosmarian@gmail.com', 'passwordispcadmin24'),-----
------(Admin, admin'admin@gmail.com', 'passwordprueba123'),----------
------(usuario, usuario@gmail.com, passwordprueba123),---------------
