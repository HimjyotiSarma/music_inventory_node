import dotenv from 'dotenv'
import pool from './db/pool.js'
import app from './app.js'

dotenv.config({
  path: './.env',
})

pool
  .connect({
    host: 'localhost',
    port: 5432,
    database: 'inventory_app',
    user: 'postgres',
    password: 'Him_Postgre_DB',
  })
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at Port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error(error)
  })
