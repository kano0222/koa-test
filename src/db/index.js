const mongoose = require("mongoose")
const { mongodbURL } = require('../config/config.default')
const dbNames = [
  "test"
]
async function addMongoDB (app) {
  try {
    const db = await mongoose.connect(mongodbURL)
    console.log(`连接mongodb成功`)
    app.context.db = dbNames.reduce((s, dbName) => {
      s[dbName] = db.connection.useDb(dbName)
      return s
    }, {})
  } catch (error) {
    console.error(`连接mongodb失败`)
    throw error
  }
}

exports.addMongoDB = addMongoDB
