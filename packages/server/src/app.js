// Config
const port = 3001

// Server
const express = require('express')
const app = express()

// Logs
const morgan = require('morgan')
app.use(morgan('dev'))

// Body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const index = require('./routes/index')
const uscensus = require('./routes/uscensus')
app.use('/', index)
app.use('/uscensus', uscensus)

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error })
})

// Start Server
app.listen(port)
console.log(`Server started on port ${port}`)
