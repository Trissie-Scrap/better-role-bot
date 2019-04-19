module.exports = (sequelize, DataTypes) => {
  class Server extends sequelize.Model {}

  Server.init({
    snowflake: {
      type: DataTypes.BIGINT,
      primaryKey: true
    }
  }, { sequelize, modelName: 'server' })

  Server.associate = models => {
    Server.hasMany(models.RoleCategory, { foreignKey: 'serverSnowflake' })
    Server.hasMany(models.Role, { foreignKey: 'serverSnowflake' })
  }

  return Server
}
