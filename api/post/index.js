const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const pool = require('../../db/db')
const MessagingResponse = require('twilio').twiml.MessagingResponse
var logger = require('koa-pino-logger')
const cors = require('@koa/cors');
const app = new Koa()
app.use(bodyParser())
app.use(logger())
app.use(cors())

function sendMessage(sms){
const twiml = new MessagingResponse();
twiml.message(sms);
return twiml.toString();
}

app.use(async ctx => {
ctx.type = 'text/xml';
console.log(ctx.request.body)
const todoItem = await ctx.request.body.Body
await post(todoItem);
ctx.body = sendMessage(todoItem);
ctx.log.info('Your new item is in the todo list')
})

async function post(todoItem) {
try {
const itemData = await pool.query(`INSERT INTO todoList (todoItem) VALUES ('${todoItem}');`)
return itemData
} catch (error) {
console.log(error)
}
}

module.exports = app.callback()
