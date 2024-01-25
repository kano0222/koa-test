const Schema = require('./schema')

class UserService {
  constructor (db) {
    this.db = db
    this.Model = db.model('USER', Schema)
  }
  async createUser (username, password) {
    return await this.Model.create({ username, password })
  }
}

module.exports = UserService
