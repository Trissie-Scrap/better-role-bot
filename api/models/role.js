const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class Role extends Sequelize.Model {}

  Role.init({
    snowflake: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.BIGINT
    },
    assignable: {
      type: Sequelize.BOOLEAN
    }
  }, { sequelize, modelName: 'role' })

  Role.associate = models => {
    Role.belongsTo(models.RoleCategory, { foreignKey: 'categoryId', targetKey: 'id' })
    Role.belongsTo(models.Guild, { foreignKey: 'guildSnowflake', targetKey: 'snowflake' })
  }

  return Role
}
