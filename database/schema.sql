-- DROP DATABASE IF EXISTS codeop;
-- CREATE DATABASE codeop;

-- USE codeop;

USE heroku_a9ded5de1ff1c8b;

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(20) NOT NULL UNIQUE,
  git_username varchar(20) NOT NULL,
  session_id varchar(64),
  avatar_url varchar(100)
);

CREATE TABLE projects (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_name varchar(20) NOT NULL UNIQUE,
  description varchar(100),
  repo_url varchar(100),
  image_Url varchar(100),
  creation_date date,
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- mysql --host=DB_HOST --user=DB_USER--password=DB_PASS --reconnect DB_NAME < schema.sql

CREATE TABLE technologies (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tech_name varchar(20) NOT NULL,
  project_id int,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

/* Create other tables and define schemas for them here!

/*  Execute this file from the command line (from database folder)by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/

