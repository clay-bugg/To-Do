import express from 'express'
import cors from 'cors'
const app = express()
const PORT = 3001
const tasksRoutes = require('./routes/tasks')
const usersRoutes = require('./routes/users')

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/tasks', tasksRoutes)
app.use('/api/users', usersRoutes)

app.listen(PORT, () => { 
  console.log(`Server running at http://localhost:${PORT}`)
})