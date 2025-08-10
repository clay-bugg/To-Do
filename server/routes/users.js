import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
const router = Router()

const users = [] // demo only

router.post('/signup', (req, res) => {
  const username = req.body.username?.trim().toLowerCase()
  const password = req.body.password?.trim()
  if (!username || !password) return res.status(400).json({ error: 'Both username and password are required' })
  if (users.find(u => u.username === username)) return res.status(409).json({ error: 'Username already in use' })
  const user = { id: uuidv4(), username, password }
  users.push(user)
  res.status(201).json({ id: user.id, username: user.username })
})

router.post('/login', (req, res) => {
  const username = req.body.username?.trim().toLowerCase()
  const password = req.body.password?.trim()
  const user = users.find(u => u.username === username && u.password === password)
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  res.json({ id: user.id, username: user.username })
})

export default router

