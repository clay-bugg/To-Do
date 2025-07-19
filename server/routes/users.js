const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const users = []

router.post('/signup', (req, res) => { 
  const { username, password } = req.body

  if (!username || !password) { 
    return res.status(400).json({ error: 'Both username and password are required' })
  }

  const existingUser = users.find(user => user.username === username)
  if (existingUser) { 
    return res.status(400).json({ 'Username already in use' })
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

