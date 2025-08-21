// server.js (run with: node server.js)  — package.json must have: { "type": "module" }
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JSONFilePreset } from 'lowdb/node'

const app = express()
app.use(cors())
app.use(express.json())

// persistent file db.json
const db = await JSONFilePreset('db.json', { users: [], tasks: [] })
const uid = () => crypto.randomUUID?.() ?? String(Date.now())
const JWT_SECRET = 'dev-secret' // swap in env later

// ---------- USERS ----------
app.post('/api/users/signup', async (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  if (db.data.users.find(u => u.username === username)) return res.status(409).json({ error: 'username taken' })
  const hash = await bcrypt.hash(password, 10)
  const user = { id: uid(), username, password_hash: hash, created_at: new Date().toISOString() }
  db.data.users.push(user); await db.write()
  // align with your store: return user object
  res.status(201).json({ id: user.id, username: user.username })
})

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body || {}
  const u = db.data.users.find(x => x.username === username)
  if (!u) return res.status(401).json({ error: 'invalid credentials' })
  const ok = await bcrypt.compare(password, u.password_hash)
  if (!ok) return res.status(401).json({ error: 'invalid credentials' })
  const token = jwt.sign({ sub: u.id, username: u.username }, JWT_SECRET, { expiresIn: '7d' })
  // return both for future use; your store currently reads whole payload as user
  res.json({ id: u.id, username: u.username, token })
})

// ---------- TASKS (uses userId query/body like your store) ----------
app.get('/api/tasks', (req, res) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'userId required' })
  res.json(db.data.tasks.filter(t => t.userId === userId))
})

app.post('/api/tasks', async (req, res) => {
  const { userId, name } = req.body || {}
  if (!userId || !name) return res.status(400).json({ error: 'userId and name required' })
  const task = { id: uid(), userId, name, completed: false, created_at: new Date().toISOString() }
  db.data.tasks.push(task); await db.write()
  res.status(201).json(task)
})

app.patch('/api/tasks/:id', async (req, res) => {
  const { userId } = req.body || {}
  const i = db.data.tasks.findIndex(t => t.id === req.params.id && t.userId === userId)
  if (i === -1) return res.status(404).json({ error: 'not found' })
  db.data.tasks[i] = { ...db.data.tasks[i], ...req.body }
  await db.write()
  res.json(db.data.tasks[i])
})

app.delete('/api/tasks/:id', async (req, res) => {
  const { userId } = req.body || {}
  const before = db.data.tasks.length
  db.data.tasks = db.data.tasks.filter(t => !(t.id === req.params.id && t.userId === userId))
  if (db.data.tasks.length === before) return res.status(404).json({ error: 'not found' })
  await db.write()
  res.status(204).end()
})

app.listen(3001, () => console.log('api on :3001'))