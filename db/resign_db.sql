/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : resign_db

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 14/10/2022 14:05:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for applications
-- ----------------------------
DROP TABLE IF EXISTS `applications`;
CREATE TABLE `applications` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL COMMENT '0有效，其他无效',
  `owner` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `tagsID` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of applications
-- ----------------------------
BEGIN;
INSERT INTO `applications` VALUES (1, '趣办', '这是一段描述', 1, '孙磊', '2022-09-20 00:00:00', '2022-09-20 00:00:00', 1);
INSERT INTO `applications` VALUES (2, '瑞信', '这是一段描述', 1, '孙磊', '2022-09-20 00:00:00', '2022-09-20 00:00:00', 2);
INSERT INTO `applications` VALUES (3, '油邮', '这是一段描述', 1, '孙磊', '2022-09-20 00:00:00', '2022-09-20 00:00:00', 3);
INSERT INTO `applications` VALUES (4, '养老资产', '这是一段描述', 0, '孙磊', '2022-09-20 00:00:00', '2022-09-20 00:00:00', 4);
INSERT INTO `applications` VALUES (5, '中有即时通信', '这是一段描述', 1, '枫叶', '2022-09-20 00:00:00', '2022-09-20 00:00:00', 5);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1, 'sunlei', '$2a$10$EWy/0rDFnoPEb2Eu29Vtk.rTyJUxYaTqJ7cM/hVbMYsqjWVWx05US', '枫叶', NULL, NULL, NULL);
INSERT INTO `users` VALUES (3, 'fengye', '$2a$10$wxSVjrbdTsChXfRi87ibUelp.xm808U73rgtrE4vwi6iGoIrxYzKq', '枫叶', NULL, NULL, NULL);
INSERT INTO `users` VALUES (4, 'root', '$2a$10$VuS2.uRUkhYSXQGZ5.fc4OyQ2JMEPhB5B01jjDaKP4MVL/2Nyr4uO', '枫叶', NULL, NULL, NULL);
INSERT INTO `users` VALUES (5, 'user', '$2a$10$5x0Oe8PJgpgNCtntBRbniO20t25gxood4wYl0TJ5dBu.0eyBJMW8i', '🍁', NULL, NULL, NULL);
INSERT INTO `users` VALUES (7, 'admin', '$2a$10$2xtYAlQh0VTg.vlRfqCoMOXBYRW0EcrRmoxbJohv5UFqEuah2R35C', 'Serati Ma', NULL, 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
