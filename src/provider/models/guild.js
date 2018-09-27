const { defaultPrefix } = require('../../../auth')
const { TEXT } = require('sequelize')
const db = require('../Database')

module.exports = db.define('guilds', {
  id: {
    type: TEXT,
    unique: true,
    primaryKey: true
  },
  name: TEXT,
  owner: TEXT,
  prefix: {
    type: TEXT,
    defaultValue: defaultPrefix
  },
  twitterChannelID: {
    type: TEXT,
    defaultValue: null,
    allowNull: true
  }
})
