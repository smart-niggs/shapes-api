require('dotenv').config()

module.exports = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  timezeone: process.env.TIMEZONE,
  logging: false
}
