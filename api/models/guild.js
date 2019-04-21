const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class Guild extends Sequelize.Model {}

  Guild.init({
    snowflake: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    iconHash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    memberCount: {
      type: Sequelize.INTEGER
    },
    syncedAt: {
      type: Sequelize.DATE
    }
  }, { sequelize, modelName: 'guild' })

  Guild.associate = models => {
    Guild.hasMany(models.RoleCategory, { foreignKey: 'guildSnowflake' })
    Guild.hasMany(models.Role, { foreignKey: 'guildSnowflake' })
  }

  return Guild
}
