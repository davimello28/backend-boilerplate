import Queue from 'bull'
import * as jobs from '../jobs'

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, redisConfig),
  name: job.key,
  handle: job.handle
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)
    return queue.bull.add(data)
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)
    })
  }
}
