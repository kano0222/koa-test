const { exception } = require('../Response')


function errorCapture () {
  return async (ctx, next) => {
    console.log("======== Begin Request ========")
    console.log(`-> [${ctx.request.method}] ${ctx.request.url}`)

    try {
      await next()
      console.log(`<- [${ctx.response.status} ${ctx.response.message}] ${ctx.request.url}`)
    } catch (error) {
      console.error(`[${ctx.response.status}] ${ctx.request.url}`, error)
      ctx.response.body = exception(error)
    }
    console.log("======== Response End ========\n")
  }
}

exports.errorCapture = errorCapture
