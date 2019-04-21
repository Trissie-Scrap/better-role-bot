const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class Role extends Sequelize.Model {}

  Role.init({
    snowflake: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    assignable: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    permissions: {
      type: Sequelize.BIGINT,
      allowNull: false
    }
  }, { sequelize, modelName: 'role' })

  Role.associate = models => {
    Role.belongsTo(models.RoleCategory, { foreignKey: 'categoryId', targetKey: 'id' })
    Role.belongsTo(models.Guild, { foreignKey: 'guildSnowflake', targetKey: 'snowflake' })
  }

  return Role
}
