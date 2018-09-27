const { status, error } = require('../../utils/console')
const { defaultPrefix } = require('../../../auth')
const guilds = require('../models/guild')

module.exports = async guild => {
  const guildSize = guild.client.guilds.size
  try {
    const twitterChannel = guild.channels.find(c => /twitter/ig.test(c.name))

    await guilds.create({
      id: guild.id,
      name: guild.name,
      owner: guild.owner.id,
      prefix: defaultPrefix,
      twitterChannelID: twitterChannel ? twitterChannel.id : null
    })

    const welcomeMessage = [
      `Hello, ${guild.owner.user.username}. I joined your server, ${guild.name}.`,
      `\n\nTo start configuring your guild's settings, see \`${defaultPrefix}help\` in your guild.\t`
    ]

    guild.owner.send(welcomeMessage.join('\n'))

    status(`${guild.name} (ID: ${guild.id}) created. ${guildSize} total guilds.`)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') return status(`${guild.name} (ID: ${guild.id}) already exists, joined anyway. ${guildSize} total guilds.`)
    await guild.owner.send(`I left your guild because there was a problem initiating your guild. If the issue persists, please contact ${guild.client.users.get(guild.client.ownerID)}`)
    guild.leave()
    error(err.stack)
  }
}
