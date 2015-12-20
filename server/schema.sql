/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.
 ******************************************/

CREATE DATABASE got;

USE got;

CREATE TABLE users(
  user_id int NOT NULL AUTO_INCREMENT,
  username varchar(30) NOT NULL,
  password varchar(30) NOT NULL,
  email varchar(45) NOT NULL,
  isModerator varchar(5) NOT NULL,
  league_id int,
  PRIMARY KEY (user_id),
  FOREIGN KEY (league_id) REFERENCES leagues(league_id)
);

CREATE TABLE characters(
  char_id int NOT NULL AUTO_INCREMENT,
  name varchar(60) NOT NULL,
  house varchar(30) NOT NULL,
  image varchar(255) NOT NULL,
  PRIMARY KEY (char_id)
);

CREATE TABLE leagues(
  league_id int NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  PRIMARY KEY (league_id)
);

CREATE TABLE events(
  event_id int NOT NULL AUTO_INCREMENT,
  type varchar(255) NOT NULL,
  description varchar(255),
  points int NOT NULL,
  season int NOT NULL,
  episode int NOT NULL,
  char_id int,
  FOREIGN KEY (char_id) REFERENCES characters(char_id),
  PRIMARY KEY (event_id)
);