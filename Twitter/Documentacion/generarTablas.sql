-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema twitter_data
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema twitter_data
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `twitter_data` DEFAULT CHARACTER SET latin1 ;
USE `twitter_data` ;

-- -----------------------------------------------------
-- Table `twitter_data`.`hashtags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitter_data`.`hashtags` (
  `hashtag` VARCHAR(25) NOT NULL,
  `tema` VARCHAR(25) NOT NULL,
  `apariciones` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `twitter_data`.`incluirTema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitter_data`.`incluirTema` (
  `idTema` VARCHAR(25) NOT NULL,
  `temaIncluido` VARCHAR(45) NOT NULL,
  `apariciones` INT(11) NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `twitter_data`.`palabra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitter_data`.`palabra` (
  `palabra` VARCHAR(50) NOT NULL,
  `tema` VARCHAR(25) NOT NULL,
  `apariciones` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `twitter_data`.`tema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitter_data`.`tema` (
  `idTema` VARCHAR(25) NOT NULL,
  `cantUsuarios` INT(11) NOT NULL,
  `cantTweets` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `twitter_data`.`tiempo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `twitter_data`.`tiempo` (
  `idTema` VARCHAR(25) NOT NULL,
  `hora` INT(11) NOT NULL,
  `apariciones` INT(11) NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
