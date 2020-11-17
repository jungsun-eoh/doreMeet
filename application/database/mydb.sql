-- MySQL Script generated by MySQL Workbench
-- Wed Oct 28 06:46:12 2020
-- Model: New Model    Version: 1.0
-- MySQL Workaccountaccount_idbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
CREATE DATABASE IF NOT EXISTS `mydb`;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `user_id` TINYINT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(64) NOT NULL,
  `last_name` VARCHAR(64) NOT NULL,
  `gender` CHAR(1) NOT NULL,
  `date_of_birth` DATETIME NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `phone_number` VARCHAR(11) NULL,
  `art_category` VARCHAR(10) NOT NULL,
  `art_category_tag` VARCHAR(10) NULL,
  `skill_lvl` CHAR(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`address` ;

CREATE TABLE IF NOT EXISTS `mydb`.`address` (
  `address_id` TINYINT NOT NULL AUTO_INCREMENT,
  `street_number` INT NULL,
  `street` VARCHAR(128) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` CHAR(2) NOT NULL,
  `zipcode` INT NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`address_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user_Add`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user_Add` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user_Add` (
  `user` TINYINT NULL,
  `address` TINYINT NULL,
  INDEX `user_add__user_FK_idx` (`user` ASC),
  INDEX `user_add__address_FK_idx` (`address` ASC),
  CONSTRAINT `user_add__user_FK`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user_add__address_FK`
    FOREIGN KEY (`address`)
    REFERENCES `mydb`.`address` (`address_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`account`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`account` ;

CREATE TABLE IF NOT EXISTS `mydb`.`account` (
  `account_id` TINYINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `acc_created` DATETIME NOT NULL,
--  `activate` INT acc_createdactivate NOT NULL DEFAULT 0,
  `user` TINYINT NULL,
  PRIMARY KEY (`account_id`),
  INDEX `account_user_FK_idx` (`user` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  CONSTRAINT `account_user_FK`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`accountType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`accountType` ;

CREATE TABLE IF NOT EXISTS `mydb`.`accountType` (
  `account_type_id` TINYINT NOT NULL AUTO_INCREMENT,
  `account_type_desc` VARCHAR(45) NOT NULL,
  `account` TINYINT NOT NULL,
  PRIMARY KEY (`account_type_id`),
  INDEX `accountType_account_FK_idx` (`account` ASC),
  CONSTRAINT `accountType_account_FK`
    FOREIGN KEY (`account`)
    REFERENCES `mydb`.`account` (`account_id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`matches`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`matches` ;

CREATE TABLE IF NOT EXISTS `mydb`.`matches` (
  `matches_id` TINYINT NOT NULL AUTO_INCREMENT,
  `client_username` VARCHAR(64) NOT NULL,
  `client_match_status` VARCHAR(10) NULL,
  PRIMARY KEY (`matches_id`),
  UNIQUE INDEX `client_username_UNIQUE` (`client_username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`preferences`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`preferences` ;

CREATE TABLE IF NOT EXISTS `mydb`.`preferences` (
  `preferences_id` TINYINT NOT NULL AUTO_INCREMENT,
  `min_age` CHAR(2) NULL,
  `max_age` CHAR(2) NULL,
  `min_location` CHAR(3) NULL,
  `max_location` CHAR(3) NOT NULL,
  `gender` CHAR(1) NULL,
  `art_preference` VARCHAR(10) NOT NULL,
  `skill_lvl` CHAR(1) NULL,
  `meeting_pref` VARCHAR(10) NOT NULL,
  `user` TINYINT NOT NULL,
  `matches` TINYINT NOT NULL,
  PRIMARY KEY (`preferences_id`),
  INDEX `preferences_user_FK_idx` (`user` ASC),
  INDEX `preferences_matches_FK_idx` (`matches` ASC),
  CONSTRAINT `preferences_user_FK`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `preferences_matches_FK`
    FOREIGN KEY (`matches`)
    REFERENCES `mydb`.`matches` (`matches_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`filePath`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`file_Path` ;

CREATE TABLE IF NOT EXISTS `mydb`.`file_Path` (
  `file_path_id` TINYINT NOT NULL AUTO_INCREMENT,
  `profile_pic` VARCHAR(128) NULL,
  `picture_path` VARCHAR(128) NULL,
  `picture_desc` VARCHAR(255) NULL,
  `video_path` VARCHAR(128) NULL,
  `video_desc` VARCHAR(255) NULL,
  `audio_path` VARCHAR(128) NULL,
  `audio_descp` VARCHAR(255) NULL,
  `social_profile_1` VARCHAR(128) NULL,
  `social_profile_2` VARCHAR(128) NULL,
  `social_profile_3` VARCHAR(128) NULL,
  `social_profile_4` VARCHAR(128) NULL,
  `user` TINYINT NULL,
  PRIMARY KEY (`file_path_id`),
  INDEX `file_path_user_FK_idx` (`user` ASC),
  CONSTRAINT `file_path_user_FK`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`chat_file`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`chat_file` ;

CREATE TABLE IF NOT EXISTS `mydb`.`chat_file` (
  `chat_file_id` TINYINT NOT NULL AUTO_INCREMENT,
  `chat_file_name` INT NOT NULL,
  `chat_file_path` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`chat_file_id`),
  UNIQUE INDEX `chat_file_name_UNIQUE` (`chat_file_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`chat_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`chat_message` ;

CREATE TABLE IF NOT EXISTS `mydb`.`chat_message` (
  `chat_message_id` TINYINT NOT NULL AUTO_INCREMENT,
  `user_id` TINYINT NOT NULL,
  `client_username` VARCHAR(64) NOT NULL,
  `msg_creation` DATETIME NOT NULL,
  `chat_file` TINYINT NOT NULL,
  PRIMARY KEY (`chat_message_id`),
  INDEX `caht_message_chat_file_FK_idx` (`chat_file` ASC),
  CONSTRAINT `caht_message_chat_file_FK`
    FOREIGN KEY (`chat_file`)
    REFERENCES `mydb`.`chat_file` (`chat_file_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`chat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`chat` ;

CREATE TABLE IF NOT EXISTS `mydb`.`chat` (
  `chat_id` TINYINT NOT NULL AUTO_INCREMENT,
  `matches` TINYINT NOT NULL,
  `chat_message` TINYINT NULL,
  PRIMARY KEY (`chat_id`),
  INDEX `chat_matches_FK_idx` (`matches` ASC),
  INDEX `chat__chat_message_FK_idx` (`chat_message` ASC),
  CONSTRAINT `chat_matches_FK`
    FOREIGN KEY (`matches`)
    REFERENCES `mydb`.`matches` (`matches_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `chat__chat_message_FK`
    FOREIGN KEY (`chat_message`)
    REFERENCES `mydb`.`chat_message` (`chat_message_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`communityPage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`communityPage` ;

CREATE TABLE IF NOT EXISTS `mydb`.`communityPage` (
  `comm_pg_id` TINYINT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(64)  NULL,
  `last_name` VARCHAR(64) NULL,
  `post_title` VARCHAR(64) NOT NULL,
  `post_category` VARCHAR(10) NOT NULL,
  `post_file` VARCHAR(128) NULL,
  `post_votes` INT NULL,
  `post_creation` DATETIME NULL,
  `user` TINYINT NULL,
  PRIMARY KEY (`comm_pg_id`),
  INDEX `communityPage_user_FK_idx` (`user` ASC),
  CONSTRAINT `communityPage_user_FK`
    FOREIGN KEY (`user`)
    REFERENCES `mydb`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

INSERT INTO `mydb`.`communitypage`(`post_title`,`post_category`,`post_file`)
VALUES								            ('Test',	     'Music',		    'b.png');	

INSERT INTO `mydb`.`user`(`first_name`,`last_name`,`gender`,`date_of_birth`,`email`,  	`phone_number`,`art_category`,`skill_lvl`)
VALUES					         ('first',		  'last',		  'f',	  '2020-12-01','	mail@mail',	'7073334444',	  'D',			    'I');

INSERT INTO `mydb`.`account`(`username`,`password`,`user`)
VALUES						          ('123',		  '123',		  1);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
