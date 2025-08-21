const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const users = []

router.post('/signup', (req, res) => { 
  const username = req.body.username?.trim()
  const password = req.body.password?.trim()

  if (!username || !password) { 
    return res.status(400).json({ error: 'Both username and password are required' })
  }

  const existingUser = users.find(user => user.username.toLowerCase() === username.toLowerCase())
  if (existingUser) { 
    return res.status(409).json({ error: 'Username already in use' })
  }

  const newUser = {
    id: uuidv4(),
    username,
    password,
  }

  users.push(newUser)
  res.status(201).json({
    id: newUser.id, username: newUser.username
  })
})

router.post('/login', (req, res) => { 
  const { username, password } = req.body

  const user = users.find(user => user.username === username && user.password === password)
  if (!user) { 
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  res.json({ id: user.id, username: user.username })
})

module.exports = router