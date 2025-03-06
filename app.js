import express from 'express'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
)
app.use(express.static('public'))
app.use(express.urlencoded({ urlencoded: false }))
app.set('views', path.join(process.cwd(), 'views'))
app.set('view engine', 'ejs')

// Register Routers

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

export default app
