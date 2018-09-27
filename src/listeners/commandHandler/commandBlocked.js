const { Listener } = require('discord-akairo')

module.exports = class CommandBlockedListener extends Listener {
  constructor () {
    super('commandBlocked', {
      emitter: 'commandHandler',
      event: 'commandBlocked'
    })
  }

  exec (message, command, reason) {
    if (command.shouldAwait) { return message.reply(reason) }
  }
}
