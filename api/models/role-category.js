const crypto = require('crypto')
const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class RoleCategory extends Sequelize.Model {}

  RoleCategory.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    exclusive: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, { sequelize, modelName: 'roleCategory' })

  RoleCategory.associate = models => {
    RoleCategory.hasMany(models.Role, { foreignKey: 'categoryId', targetKey: 'id' })
    RoleCategory.belongsTo(models.Guild, { foreignKey: { name: 'guildSnowflake', allowNull: false }, targetKey: 'snowflake' })
  }

  return RoleCategory
}
