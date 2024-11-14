CREATE USER gladiator WITH PASSWORD 'gladiator';
CREATE USER arenauser WITH PASSWORD 'arenauser';

CREATE DATABASE IF NOT EXISTS arena  OWNER gladiator;

\c arena gladiator;

ALTER DEFAULT PRIVILEGES 
    FOR USER gladiator 
    IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO arenauser;
    

CREATE TABLE IF NOT EXISTS players  (
    pid INTEGER NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(96) UNIQUE NOT NULL,
    password TEXT NOT NULL,

    CONSTRAINT pk_players PRIMARY KEY (pid)
);

CREATE TABLE IF NOT EXISTS organizations  (
    oid INTEGER NOT NULL,
    name VARCHAR(20) UNIQUE NOT NULL,
    owner INTEGER NOT NULL,
    
    CONSTRAINT pk_organizations PRIMARY KEY (oid),
    CONSTRAINT fk_organizations_players FOREIGN KEY (owner) REFERENCES players (pid)
);

CREATE TABLE IF NOT EXISTS org_members  (
    oid INTEGER NOT NULL,
    pid INTEGER NOT NULL,
    type VARCHAR(10) NOT NULL,

    CONSTRAINT pk_associated PRIMARY KEY(oid, pid, type),
    CONSTRAINT fk_associated_organizations FOREIGN KEY (oid) REFERENCES organizations (oid),
    CONSTRAINT fk_associated_players FOREIGN KEY (pid) REFERENCES players (pid)
);

CREATE TABLE IF NOT EXISTS sports  (
    sid INTEGER NOT NULL,
    name VARCHAR(15) NOT NULL,
    
    CONSTRAINT pk_sports PRIMARY KEY (sid)
);

CREATE TABLE IF NOT EXISTS org_sports  (
    oid INTEGER NOT NULL,
    sid INTEGER NOT NULL,

    CONSTRAINT pk_org_sports PRIMARY KEY(oid, sid),
    CONSTRAINT fk_org_sports_organizations FOREIGN KEY (oid) REFERENCES organizations (oid),
    CONSTRAINT fk_org_sports_sports FOREIGN KEY (sid) REFERENCES sports (sid)
);

CREATE TABLE IF NOT EXISTS tournaments  (
    tid INTEGER NOT NULL,
    name VARCHAR(64) NOT NULL,
    owner INTEGER NOT NULL,
    startDate TIMESTAMP NOT NULL,
    sport INTEGER NOT NULL,

    CONSTRAINT pk_tournaments PRIMARY KEY (tid),
    CONSTRAINT fk_tournaments_organizations FOREIGN KEY (owner) REFERENCES organizations (oid),
    CONSTRAINT fk_tournaments_sports FOREIGN KEY (sport) REFERENCES sports (sid)
);

CREATE TABLE IF NOT EXISTS tournament_competitors  (
    tid INTEGER NOT NULL,
    oid INTEGER NOT NULL,

    CONSTRAINT pk_tournament_competitors PRIMARY KEY (tid, oid),
    CONSTRAINT fk_tournament_competitors_tournaments FOREIGN KEY (tid) REFERENCES tournaments (tid),
    CONSTRAINT fk_tournament_competitors_organizations FOREIGN KEY (oid) REFERENCES organizations (oid)
);

CREATE TABLE IF NOT EXISTS formats  (
    fid INTEGER NOT NULL,
    name varchar(64) NOT NULL,

    CONSTRAINT pk_formats PRIMARY KEY (fid)
);

INSERT INTO players (pid, username, email, password)
VALUES (1, 'player1', 'player1@example.com', 'hashed_password');
INSERT INTO organizations (oid, name, owner)
VALUES (1, 'Org1', 1);
INSERT INTO sports (sid, name)
VALUES (1, 'Soccer');
INSERT INTO org_sports (oid, sid)
VALUES (1, 1);
INSERT INTO tournaments (tid, name, owner, startDate, sport)
VALUES (1, 'Tournament1', 1, '2024-11-13 10:00:00', 1);
INSERT INTO tournament_competitors (tid, oid)
VALUES (1, 1);
INSERT INTO formats (fid, name) 
VALUES (1, 'Single Elimination 16 Teams');