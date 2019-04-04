const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../db/db')
const log = require('koa-pino-logger')
const cors = require('@koa/cors');

const app = new Koa()

app.use(bodyParser())
app.use(log())
app.use(cors())

app.use(async ctx => {
  
  const item = await show()
  ctx.body = item

})

async function show() {
  try {
    const itemData = await pool.query(` SELECT * FROM todoList `)
  
    return itemData

  } catch (error) {
    console.log(error)
  }
}

module.exports = app.callback()



