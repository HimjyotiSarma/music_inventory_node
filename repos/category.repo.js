const pool = require('../db/pool.js')

class CategoryRepo {
  static async insertOne(name, description, image) {
    const { rows } = await pool.query(
      'INSERT INTO categories (name, description, img_url) VALUES($1, $2, $3) RETURNING *',
      [name, description, image]
    )
    return rows[0]
  }

  static async findByName(category_name) {
    const { rows } = await pool.query(
      'SELECT * FROM categories WHERE name = $1',
      [category_name]
    )
    return rows[0]
  }
  static async findOne(category_name) {
    const { rows } = await pool.query(
      'SELECT * FROM categories WHERE name = $1',
      [category_name]
    )
    return rows[0]
  }
  static async findMany() {
    const { rows } = await pool.query('SELECT * FROM categories')
    return rows
  }
  static async findDistinctNames() {
    const { rows } = pool.query('SELECT name FROM categories')
    return rows
  }
}

module.exports = CategoryRepo
