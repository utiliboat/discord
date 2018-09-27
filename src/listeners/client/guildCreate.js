const { Listener } = require('discord-akairo')
const createGuild = require('../../provider/methods/createGuild')

module.exports = class GuildCreateListener extends Listener {
  constructor () {
    super('guildCreate', {
      emitter: 'client',
      event: 'guildCreate'
    })
  }

  exec (guild) {
    createGuild(guild)
  }
}
