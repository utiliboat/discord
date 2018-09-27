const Sequelize = require('sequelize')

module.exports = new Sequelize('Utiliboat', null, null, {
  dialect: 'sqlite',

  pool: {
    max: 10,
    min: 0,
    acquire: 30 * 1000
  },

  logging: false,
  omitNull: true,
  define: { freezeTableName: true },
  operatorsAliases: Sequelize.Op,
  storage: `${__dirname}/Utiliboat.db`
})
