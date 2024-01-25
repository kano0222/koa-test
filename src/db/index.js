// import mongoose from "mongoose"
const mongoose = require("mongoose")
const dbNames = [
  "test"
]
async function addMongoDB (app) {
  // const url = app.context.config.get("dataSource.mongodb")
  const url = require('../../config.json').dataSource.mongodb
  // console.log(mongoose)
  const db = await mongoose.connect(url)
  console.log(`连接mongodb成功`)
  app.context.db = dbNames.reduce((s, dbName) => {
    s[dbName] = db.connection.useDb(dbName)
    return s
  }, {})
}

exports.addMongoDB = addMongoDB
