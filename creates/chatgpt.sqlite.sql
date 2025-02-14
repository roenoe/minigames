-- SQLite does not support SCHEMA, so no CREATE SCHEMA or USE statements are needed.

-- Table `leaderboard`
CREATE TABLE IF NOT EXISTS leaderboard (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  idgame INTEGER NOT NULL,
  iduser INTEGER NOT NULL,
  score INTEGER NOT NULL
);

-- Table `user`
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Table `game`
CREATE TABLE IF NOT EXISTS game (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gamename TEXT NOT NULL
);

-- Foreign Keys (SQLite requires PRAGMA foreign_keys=ON to enforce them)
PRAGMA foreign_keys = ON;

ALTER TABLE leaderboard ADD CONSTRAINT fk_leaderboard_user FOREIGN KEY (iduser) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE leaderboard ADD CONSTRAINT fk_leaderboard_game FOREIGN KEY (idgame) REFERENCES game (id) ON DELETE NO ACTION ON UPDATE NO ACTION;
