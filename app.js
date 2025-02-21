import * as sql from './sql.js'

import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'better-sqlite3'
const db = sqlite3('./db/minigames.db')

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'public')


// Login funcion
app.post('/login', async (req, res) => {
  // Define variables from form for comparison
  const { username, password } = req.body
  let match = false

  // Get user from database
  const userid = sql.getid(username) //NEED TO DEFINE THIS FUNCTION
  if (!userid) {
    return res.status(401).send('Invalid username or password')
  }
  const user = sql.getuser(userid) //NEED TO DEFINE THIS FUNCTION

  // Check if password matches
  if (password == user.password) {
    match = true
  } else { match = false }

  // Save login info in session
  if (match) { //NEED TO DEFINE REQ.SESSION
    req.session.loggedin = true //NEED TO DEFINE REQ.SESSION
    req.session.username = user.name //NEED TO DEFINE REQ.SESSION
    req.session.userid = user.id //NEED TO DEFINE REQ.SESSION
  }
  return res.redirect('/')
})


// Send all game names to the user
app.get('/fetchgames', (req, res) => {
  const sql = db.prepare('select * from game')
  let games = sql.all()
  res.send(games)
})


app.use(express.static(staticPath))
app.listen(21570, () => console.log('server running on http://127.0.0.1:21570/'))
