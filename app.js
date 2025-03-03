import * as sql from './sql.js'

import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'public')

// Middleware/session (req.session)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // This is just because of HTTP vs HTTPS
}))

// Make sure the user is logged in
const pathstocheck = [
  '/',
  '/index.html',
  '/games/*'
]
for (var i = 0; i < pathstocheck.length; i++) {
  app.get(pathstocheck[i], checkloggedin, (req, res) => {
    return res.sendFile(path.join(staticPath))
  })
}


// Login funcion
app.post('/login', async (req, res) => {
  // Define variables from form for comparison
  const { username, password } = req.body
  let match = false

  // Get user from database
  const userid = sql.getid(username)
  if (!userid) {
    return res.status(401).send('Invalid username or password')
  }
  const user = sql.getuser(userid)

  // Check if password matches
  console.log("user.password:", user.password)
  console.log("password:", password)
  if (password == user.password) {
    match = true
  } else { match = false; console.log("no match") }

  // Save login info in session
  if (match) {
    console.log("MATCHINGGGG")
    req.session.loggedin = true
    req.session.username = user.name
    req.session.userid = user.id
  }
  return res.redirect('/')
})

function checkloggedin(req, res, next) {
  if (req.session.loggedi) {
    console.log('Logged in')
    return next()
  } else {
    console.log('Not logged in')
    return res.redirect('/login.html')
  }
}

// Logout function
app.get('/logout', checkloggedin, (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


// Send all game names to the user
app.get('/fetchgames', (req, res) => {
  let games = sql.fetchgames()
  res.send(games)
})


app.use(express.static(staticPath))
app.listen(21570, () => console.log('server running on http://127.0.0.1:21570/'))
