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
    id SERIAL,
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

INSERT INTO tournament(tournamentname, joindate, tournamentdate, prize, format, sport, capacity) VALUES ( 'Tournament 1', '2024-12-10', '2024-12-12', 150.00, 2, 1, 16);
INSERT INTO tournament(tournamentname, joindate, tournamentdate, prize, format, sport, capacity) VALUES ( 'Tournament 2', '2025-03-07', '2024-05-10', 6000.00, 3, 2, 16);
INSERT INTO tournament(tournamentname, joindate, tournamentdate, prize, format, sport, capacity) VALUES ( 'Tournament 3', '2024-11-01', '2024-11-02', 0.00, 1, 3, 4);

-- ORGS ----


CREATE TABLE if NOT EXISTS organization(
    id SERIAL,
    orgname VARCHAR(50) NOT NULL,
    descr VARCHAR(255),
    own INTEGER NOT NULL,
    CONSTRAINT pk_organization PRIMARY KEY (id),
    CONSTRAINT fk_client FOREIGN KEY(own) REFERENCES client(id)
);

INSERT INTO organization(orgname,descr,own) VALUES ('OS GURI','EXEMPLO DE ORG',12345);

-- TEAM -----


CREATE TABLE if NOT EXISTS team(
    id SERIAL,
    orgid INTEGER NOT NULL,
    sportid INTEGER NOT NULL,
    teamname VARCHAR(50) NOT NULL,
    descr VARCHAR(255),
    CONSTRAINT pk_team PRIMARY KEY (id),
    CONSTRAINT fk_org FOREIGN KEY(orgid) REFERENCES organization(id),
    CONSTRAINT fk_sport FOREIGN KEY(sportid) REFERENCES sport(id)
);

INSERT INTO team (orgid,sportid,teamname,descr) VALUES (1,1,'OS GURI DO LOL','HAHAHAHA');
INSERT INTO team (orgid,sportid,teamname,descr) VALUES (1,1,'OS GURI DO LOL2','HAHAHAHA');
INSERT INTO team (orgid,sportid,teamname,descr) VALUES (1,1,'OS GURI DO LOL3','HAHAHAHA');
INSERT INTO team (orgid,sportid,teamname,descr) VALUES (1,1,'OS GURI DO LOL4','HAHAHAHA');
INSERT INTO team (orgid,sportid,teamname,descr) VALUES (1,1,'OS GURI DO LOL5','HAHAHAHA');
INSERT INTO team (orgid,sportid,teamname,descr) VALUES (1,1,'OS GURI DO LOL6','HAHAHAHA');


-- player ----

CREATE TABLE if NOT EXISTS player (
    teamid INTEGER NOT NULL,

);

-- Participants ------

CREATE TABLE if NOT EXISTS participants(
    tournamentid INTEGER NOT NULL,
    teamid INTEGER NOT NULL,
    CONSTRAINT fk_tournament FOREIGN KEY(tournamentid) REFERENCES tournament(id),
    CONSTRAINT fk_team FOREIGN KEY(teamid) REFERENCES team(id)
);

INSERT INTO participants VALUES(1,1);
INSERT INTO participants VALUES(1,2);
INSERT INTO participants VALUES(1,3);
INSERT INTO participants VALUES(1,4);
INSERT INTO participants VALUES(1,5);
INSERT INTO participants VALUES(1,6);