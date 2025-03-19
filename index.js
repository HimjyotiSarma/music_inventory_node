const dotenv = require('dotenv')
dotenv.config({ path: './.env' }) // Ensure .env loads before anything else

const pool = require('./db/pool.js')
const app = require('./app.js')

// console.log('DATABASE_URL:', process.env.DATABASE_URL)

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

pool
  .connect({
    host: 'localhost',
    database: 'inventory_app',
    user: 'himjyoti',
    password: 'Him_Postgre_DB',
    port: 5432,
  })
  .then(() => {
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Database connection error:', error)
  })

// host: process.env.PGHOST,
// database: process.env.PGDATABASE,
// user: process.env.PGUSER,
// password: process.env.PGPASSWORD,
// port: 5432,
// ssl: {
//   require: true,
// },

// host: 'localhost',
// database: 'inventory_app',
// user: 'himjyoti',
// password: 'Him_Postgre_DB',
// port: 5432,
