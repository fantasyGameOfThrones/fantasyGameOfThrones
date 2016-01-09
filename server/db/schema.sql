DROP DATABASE IF EXISTS got;

CREATE DATABASE got;

USE got;

CREATE TABLE leagues(
  league_id int NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL UNIQUE,
  moderator_id int NOT NULL,
  PRIMARY KEY (league_id)
);

CREATE TABLE users(
  user_id int NOT NULL AUTO_INCREMENT,
  username varchar(30) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  email varchar(45),
  league_id int,
  PRIMARY KEY (user_id),
  FOREIGN KEY (league_id) REFERENCES leagues(league_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE TABLE leagues_to_users(
--   id int NOT NULL AUTO_INCREMENT,
--   league_id int NOT NULL,
--   user_id int NOT NULL,
--   PRIMARY KEY (id),
--   FOREIGN KEY (league_id) REFERENCES leagues(league_id)
--     ON DELETE CASCADE ON UPDATE CASCADE,
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
--     ON DELETE CASCADE ON UPDATE CASCADE
-- );

CREATE TABLE characters(
  char_id int NOT NULL AUTO_INCREMENT,
  name varchar(60) NOT NULL,
  nickname varchar(60),
  house varchar(30) NOT NULL,
  image varchar(255) NOT NULL,
  PRIMARY KEY (char_id)
);


CREATE TABLE events(
  event_id int NOT NULL AUTO_INCREMENT,
  type varchar(255) NOT NULL,
  description varchar(255),
  points int NOT NULL,
  episode int NOT NULL,
  char_id int,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (event_id)
);

CREATE TABLE roster_data(
  roster_id int NOT NULL AUTO_INCREMENT,
  league_id int NOT NULL,
  user_id int NOT NULL,
  char_id int NOT NULL,
  episode int NOT NULL,
  FOREIGN KEY (league_id) REFERENCES leagues(league_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (char_id) REFERENCES characters(char_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (roster_id)
);

ALTER TABLE leagues 
ADD FOREIGN KEY (moderator_id) REFERENCES users(user_id);