const { Listener } = require('discord-akairo')
const { status, error } = require('../../utils/console')

module.exports = class ReadyListener extends Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  exec () {
    try {
      const me = this.client.user
      const guildSize = this.client.guilds.size

      status(`Logged in as ${me.tag} (ID: ${me.id})`)
      status(`Guilds: ${this.client.guilds.map(g => g.name).join(', ')}`)
      me.setActivity(`@${me.username} help`, { type: 'LISTENING' })

      if (guildSize) {
        status(`Listening to ${guildSize === 1
          ? this.client.guilds.first()
          : `${guildSize} Guilds`}`)
      } else status('Standby Mode')
    } catch (err) {
      error(err)
    }
  }
}
