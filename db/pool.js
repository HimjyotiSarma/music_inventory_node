const { Pool } = require('pg')

class PgPool {
  #pool = null // Using a private class field

  async connect(options) {
    if (!this.#pool) {
      this.#pool = new Pool(options)
      try {
        await this.#pool.connect()
        await this.#pool.query('SELECT 1+1;') // Validate connection
      } catch (error) {
        console.error('Full error details:', error)
        await this.#pool.end() // Cleanup on failure
        this.#pool = null
        throw new Error('Connection failed: ' + error.message)
      }
    } else if (this.#pool.options !== options) {
      throw new Error('Pool already initialized with different options')
    }
    return this.#pool // Return the pool instance if needed
  }

  async close() {
    if (this.#pool) {
      await this.#pool.end()
      this.#pool = null // Clear pool reference
    }
  }

  async query(sql, params = []) {
    if (!this.#pool) {
      throw new Error('Pool NOT connected')
    }
    return this.#pool.query(sql, params)
  }
}

module.exports = new PgPool() // Singleton instance
