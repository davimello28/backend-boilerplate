import express from 'express'
import mongoose from 'mongoose'

import ExpressMonitor from 'express-status-monitor'
import BullBoard from 'bull-board'
import Queue from './configs/queue'

import { Server } from 'http'
import { existsSync, mkdir } from 'fs'
import { resolve } from 'path'
import cors from 'cors'
import 'dotenv/config'

import routes from './routes'

const app = express()
const server = Server(app)

BullBoard.setQueues(Queue.queues.map(queue => queue.bull))

const docsPath = resolve(__dirname, '..', 'docs')
const uploadsPath = resolve(__dirname, '..', 'uploads')
if(process.env.STORAGE_TYPE === 'local' && !existsSync(uploadsPath))
  mkdir(uploadsPath, err => {
    if(err)
      console.error(err)
  })

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true
})

mongoose.connection.on('connected', () => {
  console.log('\n--------')
  console.log('\nConnected to MongoDB')

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/', express.static(docsPath))
  app.use('/files', express.static(uploadsPath))
  app.use('/admin/queues', BullBoard.UI)
  app.use(ExpressMonitor({ path: '/admin/status' }))

  app.use(routes)

  server.listen(process.env.PORT, () => {
    console.log(`\nServer started on port:\n${ process.env.PORT }`)
    console.log(`\nYour access point and documentation available at:\n${ process.env.API_URL }`)
    console.log(`\nMonitor the performance and performance of your API:\n${ process.env.API_URL }/admin/status`)
    console.log(`\nAccess the your queues and jobs informations:\n${ process.env.API_URL }/admin/queues\n`)
    console.log('--------\n')
  })
})
