const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // future plan
const io = new Server(server)
const formatMessage = require('./utils/messages')

const PORT = 3000 || process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // future plan

const botName = 'chatBot'

// run when client connects
io.on('connection', (socket) => {

  // welcome current user
  socket.emit('message', formatMessage(botName, 'welcome to chatBot'))
  
  // broadcast when a user connects
  socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'))

  // runs when client disconnects
  socket.on('disconnect', ()=>{
    io.emit(formatMessage(botName, 'message', 'A user has left chat'))
  })

  // listen for chatMessage
  socket.on('chatMessage', msg =>{
    io.emit('message', formatMessage('USER', msg))
  } ) 

})

app.get('/', (req, res) => {
  res.render('login')
})
app.get('/chat', (req, res) => {
  res.render('index')
})

server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})