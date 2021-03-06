const cors = require('cors')
const config = require('./utils/config')
const express = require('express')
const gamesRouter = require('./controlllers/games')
const helloworldRouter = require('./controlllers/helloworld')
const mongoose = require('mongoose')
const publisherRouter = require('./controlllers/publishers')
const platformsRouter = require('./controlllers/platforms')
const middleware = require('./utils/middleware')
const app = express()

console.log('conectandose a', config.MONGODB_URI)

async function conectarBD() {
  try {
    await mongoose.connect(config.MONGODB_URI)
    console.log('se conecto a la base de datos')
  } catch (error) {
    console.log('error al conectarse a la base de datos:', error.message)
  }
}

conectarBD()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/hello', helloworldRouter)
app.use('/api/games', gamesRouter)
app.use('/api/publishers', publisherRouter)
app.use('/api/platforms', platformsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app