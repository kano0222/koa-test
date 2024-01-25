const Schema = require('./schema')

class UserService {
  constructor (db) {
    this.db = db
    this.Model = db.model('users', Schema)
  }
  async createUser (username, password) {
    return await this.Model.create({ username, password })
  }
  async findOneByUsername (username) {
    return await this.Model.findOne({ username }).exec()
  }
  async updateUser (newData) {
    const { username } = newData
    return await this.Model
      .findOneAndUpdate({ username }, newData, { new: true, returnNewDocument: true })
      .exec()
  }
  async deleteUserByUsername (username) {
    return await this.Model.findOneAndDelete({ username })
  }
  async findAll () {
    return await this.Model.find().exec()
  }
}

module.exports = UserService
