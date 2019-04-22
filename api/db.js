const config = require('config')
const debug = require('debug')('brb-api:db')
const Sequelize = require('sequelize')

const DB_HOST = config.get('db.host')
const DB_DATABASE = config.get('db.database')
const DB_USER = config.get('db.user')
const DB_PASS = config.get('db.pass')

// init database pool
const sequelize = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  dialect: 'mysql'
})

// check connection details
sequelize
  .authenticate()
  .then(() => {
    debug('db succesfully connected')
  })
  .catch((err) => {
    debug('db connection failed')
    debug(err)

    process.exit(1)
  })

// load models and setup associations
sequelize.models = {
  Role: sequelize.import('./models/role.js'),
  RoleCategory: sequelize.import('./models/role-category.js'),
  Guild: sequelize.import('./models/guild.js')
}

for (const model in sequelize.models) {
  debug('setting up associations for ' + model)
  sequelize.models[model].associate && sequelize.models[model].associate(sequelize.models)
}

// TODO: Don't run this in prod :)
sequelize.sync()

module.exports = sequelize
