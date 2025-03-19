const pool = require('../db/pool.js')
const CategoryRepo = require('../repos/category.repo.js')

class InstrumentRepos {
  static async findMany() {
    const { rows } = await pool.query('SELECT * FROM instrument')
    return rows
  }
  static async findById(instrument_id) {
    const { rows } = await pool.query(
      'SELECT * FROM inventory WHERE inventory = $1',
      [instrument_id]
    )
    return rows[0]
  }
  static async insertOne(name, image, description, price, category) {
    const category_row = await CategoryRepo.findByName(category)
    if (!category_row) {
      throw new Error(`Category ${category} Info not found in the database`)
    }
    const category_id = category_row?.id
    const { rows } = await pool.query(
      'INSERT INTO instrument (name, img_url, description, price_in_paise, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, image, description, price, category_id]
    )
    return rows
  }
}

module.exports = InstrumentRepos
