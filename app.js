const path = require('path')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // future plan
const io = new Server(server)

const PORT = 3000 || process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // future plan

// run when client connects
io.on('connection', (socket) => {
  console.log('New WS Connection...')
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