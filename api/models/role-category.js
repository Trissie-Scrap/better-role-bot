const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class RoleCategory extends Sequelize.Model {}

  RoleCategory.init({
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
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
    RoleCategory.belongsTo(models.Guild, { foreignKey: 'guildSnowflake', targetKey: 'snowflake' })
  }

  return RoleCategory
}
