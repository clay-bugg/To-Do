import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
const router = Router()

// tasks per user: { userId: Task[] }
const userTasks = {}

router.get('/', (req, res) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'Missing userId' })
  res.json(userTasks[userId] || [])
})

router.post('/', (req, res) => {
  const { userId, name } = req.body || {}
  if (!userId || !name?.trim()) return res.status(400).json({ error: 'userId and name are required' })

  const task = { id: uuidv4(), name: name.trim(), completed: false }
  userTasks[userId] ||= []
  userTasks[userId].push(task)
  res.status(201).json(task)
})

router.patch('/:id', (req, res) => {
  const { userId, name, completed } = req.body || {}
  if (!userId) return res.status(400).json({ error: 'Missing userId' })
  const list = userTasks[userId] || []
  const t = list.find(x => x.id === req.params.id)
  if (!t) return res.status(404).json({ error: 'Task not found' })
  if (typeof completed === 'boolean') t.completed = completed
  if (typeof name === 'string' && name.trim()) t.name = name.trim()
  res.json(t)
})

router.delete('/:id', (req, res) => {
  const { userId } = req.body || {}
  if (!userId) return res.status(400).json({ error: 'Missing userId' })
  const list = userTasks[userId] || []
  const i = list.findIndex(x => x.id === req.params.id)
  if (i === -1) return res.status(404).json({ error: 'Task not found' })
  const [deleted] = list.splice(i, 1)
  res.json(deleted)
})

export default router
