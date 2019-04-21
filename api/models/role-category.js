const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class RoleCategory extends Sequelize.Model {}

  RoleCategory.init({
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    exclusive: {
      type: Sequelize.BOOLEAN
    }
  }, { sequelize, modelName: 'roleCategory' })

  RoleCategory.associate = models => {
    RoleCategory.hasMany(models.Role, { foreignKey: 'categoryId', targetKey: 'id' })
    RoleCategory.belongsTo(models.Guild, { foreignKey: 'guildSnowflake', targetKey: 'snowflake' })
  }

  return RoleCategory
}
