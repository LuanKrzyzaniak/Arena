DROP DATABASE arena;
CREATE DATABASE arena;
\c arena

CREATE TABLE if NOT EXISTS arenauser(
    id INT GENERATED BY DEFAULT AS IDENTITY,
    username  VARCHAR(35) NOT NULL UNIQUE,
    displayname VARCHAR(35) NOT NULL,
    pass VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)

);

INSERT INTO arenauser (username,displayname,pass,email,birthdate) VALUES ('josias','brtt','lalala','blabla@','2020-12-01');
INSERT INTO arenauser (username,displayname,pass,email,birthdate) VALUES ('mylon','mylon','lalala','blabla@1','2020-12-01');

CREATE TABLE if NOT EXISTS sport(
    id INT GENERATED BY DEFAULT AS IDENTITY,
    sportname VARCHAR(255) NOT NULL 
);

INSERT INTO sport(sportname) VALUES ('LOL');