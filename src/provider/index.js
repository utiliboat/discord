const { status } = require('../utils/console')
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler, SequelizeProvider } = require('discord-akairo')
const { PREFIX } = require('../../auth')

const defineGuild = require('./models/guild')

const Command = require('../struct/Command')
const Selection = require('../struct/Selection')

module.exports = class UtiliboatClient extends AkairoClient {
  constructor (config) {
    super({ ownerID: config.OWNER }, {
      disableEveryone: true,
      fetchAllMembers: true
    })

    this.config = config

    this.guildSettings = new SequelizeProvider(defineGuild, { idColumn: 'id' })

    this.request = null

    this.util.selection = new Selection(this)

    this.commandHandler = new CommandHandler(this, {
      prefix: message => {
        if (!message.guild) return ''

        return this.guildSettings.get(message.guild.id, 'prefix', PREFIX)
      },
      allowMention: true,
      automateCategories: true,
      classToHandle: Command,
      commandUtil: true,
      commandUtilLifetime: 1000 * 60 * 3,
      directory: `${__dirname}/../commands`,
      defaultPrompt: {
        modifyStart: (text, msg) => text && `${msg.author}, ${text}\n\nType \`cancel\` to cancel this command.`,
        modifyRetry: (text, msg) => text && `${msg.author}, ${text}\n\nType \`cancel\` to cancel this command.`,
        timeout: msg => `${msg.author}, command expired.`,
        ended: msg => `${msg.author}, command declined.`,
        cancel: msg => `${msg.author}, command cancelled.`,
        retries: 3,
        time: 30000
      }
    })

    this.inhibitorHandler = new InhibitorHandler(this, {
      automateCategories: true,
      directory: `${__dirname}/../inhibitors`
    })

    this.listenerHandler = new ListenerHandler(this, {
      automateCategories: true,
      directory: `${__dirname}/../listeners`
    })
  }

  build () {
    this.commandHandler
      .useInhibitorHandler(this.inhibitorHandler)
      .useListenerHandler(this.listenerHandler)

    this.listenerHandler
      .setEmitters({
        commandHandler: this.commandHandler,
        inhibitorHandler: this.inhibitorHandler,
        listenerHandler: this.listenerHandler
      })

    this.listenerHandler.loadAll()
    this.commandHandler.loadAll()
    this.inhibitorHandler.loadAll()

    return this
  }

  async init () {
    await defineGuild.sync()
    status('Guild Settings Database synchronised!')
    await this.guildSettings.init()
    status('Provider set!')

    return this.login(this.config.DISCORD_TOKEN)
  }
}
