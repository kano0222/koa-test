module.exports = {
  ok (data, message = "OK") {
    return {
      code: 200,
      success: true,
      msg: message,
      data
    }
  },

  badRequest (message, code = 400, data) {
    return {
      code,
      success: false,
      msg: message,
      data: data
    }
  },

  exception (error) {
    return {
      code: 500,
      success: false,
      msg: error.message,
      data: error.stack
    }
  }
}