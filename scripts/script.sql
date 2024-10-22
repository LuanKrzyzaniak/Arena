CREATE USER arenauser WITH PASSWORD 'arenauser';

DROP DATABASE arena;
CREATE DATABASE arena WITH OWNER arenauser;
\c arena arenauser

-- CLIENT -----------------------------------------
CREATE TABLE if NOT EXISTS client(
    id INTEGER NOT NULL,
    username  VARCHAR(35) NOT NULL UNIQUE,
    displayname VARCHAR(35) NULL,
    pass VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    verified BOOLEAN NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

INSERT INTO client (id, username,displayname,pass,email,birthdate, verified) VALUES (12345, 'josias','brtt','lalala','blabla@','2020-12-01', true);
INSERT INTO client (id, username,displayname,pass,email,birthdate, verified) VALUES (54321, 'mylon','mylon','lalala','blabla@1','2020-12-01', false);

-- SPORT -----------------------------------------
CREATE TABLE if NOT EXISTS sport(
    id SERIAL,
    sportname VARCHAR(255) NOT NULL,
    CONSTRAINT pk_sport PRIMARY KEY (id)
);

INSERT INTO sport(sportname) VALUES ('League of Legends');
INSERT INTO sport(sportname) VALUES ('DOTA 2');
INSERT INTO sport(sportname) VALUES ('Counter-Strike 2');

-- TOURNAMENT FORMATS ---------------------------------
CREATE TABLE if NOT EXISTS format(
    id SERIAL,
    formatname VARCHAR(80) NOT NULL,
    CONSTRAINT pk_format PRIMARY KEY (id)
);

INSERT INTO format(formatname) VALUES ('Round Robin');
INSERT INTO format(formatname) VALUES ('Single Elimination');
INSERT INTO format(formatname) VALUES ('Double Elimination');

-- TOURNAMENT ----------------------------------------
CREATE TABLE if NOT EXISTS tournament(
    id INT NOT NULL,
    tournamentname  VARCHAR(255) NOT NULL UNIQUE,
    joindate DATE NOT NULL,
    tournamentdate DATE NOT NULL,
    prize REAL NOT NULL,
    format INTEGER NOT NULL,
    sport INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    CONSTRAINT pk_tournament PRIMARY KEY (id),
    CONSTRAINT fk_format FOREIGN KEY(format) REFERENCES format(id),
    CONSTRAINT fk_sport FOREIGN KEY(sport) REFERENCES sport(id)
);

INSERT INTO tournament(id, tournamentname, joindate, tournamentdate, prize, format, sport, capacity) VALUES (1, 'Tournament 1', '2024-12-10', '2024-12-12', 150.00, 2, 1, 16);
INSERT INTO tournament(id, tournamentname, joindate, tournamentdate, prize, format, sport, capacity) VALUES (2, 'Tournament 2', '2025-03-07', '2024-05-10', 6000.00, 3, 2, 16);
INSERT INTO tournament(id, tournamentname, joindate, tournamentdate, prize, format, sport, capacity) VALUES (3, 'Tournament 3', '2024-11-01', '2024-11-02', 0.00, 1, 3, 4);