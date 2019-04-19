module.exports = (sequelize, DataTypes) => {
  class RoleCategory extends sequelize.Model {}

  RoleCategory.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    exclusive: {
      type: DataTypes.BOOLEAN
    }
  }, { sequelize, modelName: 'roleCategory' })

  RoleCategory.associate = models => {
    RoleCategory.hasMany(models.Role, { foreignKey: 'categoryId', targetKey: 'id' })
    RoleCategory.belongsTo(models.Server, { foreignKey: 'serverSnowflake', targetKey: 'snowflake' })
  }

  return RoleCategory
}
