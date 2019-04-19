module.exports = (sequelize, DataTypes) => {
  class Role extends sequelize.Model {}

  Role.init({
    snowflake: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.BIGINT
    }
  }, { sequelize, modelName: 'role' })

  Role.associate = models => {
    Role.belongsTo(models.RoleCategory, { foreignKey: 'categoryId', targetKey: 'id' })
    Role.belongsTo(models.Server, { foreignKey: 'serverSnowflake', targetKey: 'snowflake' })
  }

  return Role
}
