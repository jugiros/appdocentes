var Sequelize = require('sequelize')
var config = module.exports
var env = require('./.env')

config.db = {
  user: env.user,
  password: env.password,
  name: env.name
}

config.db.details = {
  host: env.host,
  port: env.port,
  dialect: env.dialect}

config.keys = {
  secret: env.secret // Not anymore...
}

config.sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
)