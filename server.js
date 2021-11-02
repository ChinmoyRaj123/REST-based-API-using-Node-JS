const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())
const projectsRouter = require('./routes/projects')
app.use('/projects', projectsRouter)

const itemsRouter = require('./routes/items')
app.use('/items',itemsRouter)

const project_itemsRouter = require('./routes/project_items')
app.use('/project-items',project_itemsRouter)

app.listen(5000, () => console.log('Server Started'))