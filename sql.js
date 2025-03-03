import bcrypt from 'bcrypt'
import express from 'express';
import session from 'express-session';
import sqlite3 from 'better-sqlite3'
const db = sqlite3('./db/minigames.db')

const app = express()

export function getid(username) {
  let sqltext = 'select id from user where name = ?'
  let sql = db.prepare(sqltext)
  let rows = sql.all(username)
  if (rows.length == 0) {
    return false
  }
  return rows[0].id
}

export function getuser(userid) {
  let sqltext = 'select id, name, password from user where id = ?'
  let sql = db.prepare(sqltext)
  let rows = sql.all(userid)
  if (rows.length == 0) {
    return false
  }
  return rows[0]
}

export function fetchgames() {
  let sqltext = 'select * from game'
  let sql = db.prepare(sqltext)
  let games = sql.all()
  return games
}

