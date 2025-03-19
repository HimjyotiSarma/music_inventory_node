const express = require('express')
const cors = require('cors')
const path = require('path')

const InventoryRouter = require('./routes/inventory.router.js')
const CategoryRouter = require('./routes/categories.router.js')

const app = express()

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'ejs')

// Register Routers

app.use('/category', CategoryRouter)
app.use('/', InventoryRouter)

// This will run if Error has been passed down

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Something went terribly wrong',
    errors: err.errors || [],
    stack: process.env.NODE_ENV == 'development' ? err.stack : undefined,
  })
})

module.exports = app
