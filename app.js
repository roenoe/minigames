//import * as sql from ./sql.js
//import bcrypt from 'bcrypt'

import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'public')



app.use(express.static(staticPath))
app.listen(21570, () => console.log('server running on http://127.0.0.1:21570/'))
