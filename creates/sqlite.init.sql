PRAGMA foreign_keys = ON;

create table if not exists user (
id integer primary key autoincrement unique,
name text not null unique,
password text not null
);

create table if not exists game (
id integer primary key autoincrement unique,
name text not null unique
);

create table if not exists leaderboard (
id INTEGER PRIMARY KEY AUTOINCREMENT,
idgame integer not null references game (id),
iduser integer not null references user (id),
score integer not null
);

PRAGMA foreign_keys = ON;
