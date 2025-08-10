import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/tasks.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))
app.use((err, req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error', details: err.message })
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))