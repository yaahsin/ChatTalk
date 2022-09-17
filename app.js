const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') // future plan

const app = express()
const PORT = 3000 || process.env.PORT

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method')) // future plan

app.get('/', (req, res) => {
  res.render('login')
})
app.get('/chat', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})