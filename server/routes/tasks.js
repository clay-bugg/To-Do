const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

let tasks = []

router.get('/', (req, res) => { 
  res.json(tasks)
})

router.post('/', (req, res) => { 
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Task name required' })
  
  const newTask = {
    userId,
    id: uuidv4(),
    name,
    completed: false,
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

router.patch('/:id', (req, res) => { 
  const id = req.params.id
  const { name, completed } = req.body

  const task = tasks.find(task => task.id === id)
  if (!task) return res.status(404).json({ error: 'Task not found' })
 
  if (typeof completed === 'boolean') { 
    task.completed = completed
  }
  if (typeof name === 'string' && name.trim() !== '') { 
    task.name = name.trim()
  }

  res.json(task)
})

router.delete('/:id', (req, res) => { 
  const id = req.params.id
  const index = tasks.findIndex(task => task.id === id)

  if (index === -1) { 
    return res.status(404).json({ error: 'Task not found' })
  }

  const deletedTask = tasks.splice(index, 1)[0]
  res.json(deletedTask)
})

module.exports = router