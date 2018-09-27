const Client = require('./src/provider/')
const { status, error, warn } = require('./src/utils/console')
const config = require('./auth')

const client = new Client(config).build()

try {
  client.init()
} catch (err) {
  error(err)
}

client
  .on('disconnect', () => status('Disconnected from the API.'))
  .on('reconnect', () => status('Reconnecting...'))
  .on('error', err => error(err))
  .on('warn', info => warn(info))

process.on('unhandledRejection', err => error(`Critical: ${err.stack}`))
