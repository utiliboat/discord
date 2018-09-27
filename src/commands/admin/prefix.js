const Command = require('../../struct/Command')
const { PREFIX } = require('../../../auth')

module.exports = class PrefixCommand extends Command {
  constructor () {
    super('prefix', {
      aliases: ['prefix'],
      description: {
        content: 'Changes this guild\'s prefix.',
        usage: '<prefix value>',
        examples: ['u!', '?!']
      },
      userPermissions: ['MANAGE_GUILD'],
      channel: 'guild',
      args: [
        {
          id: 'prefix',
          type: word => {
            if (!word) return null
            if (/\s/.test(word) || word.length > 10) return null

            return word
          },
          default: PREFIX,
          prompt: {
            start: 'what would you like to set the prefix to?',
            retry: 'please provide a prefix without spaces and less than 10 characters.'
          }
        }
      ]
    })
  }

  async exec (message, { prefix }) {
    const oldPrefix = this.client.guildSettings.get(message.guild.id, 'prefix', PREFIX)
    await this.client.guildSettings.set(message.guild.id, 'prefix', prefix)

    return message.util.reply(`I have changed the guild prefix from \`${oldPrefix}\` to \`${prefix}\`.`)
  }
}
