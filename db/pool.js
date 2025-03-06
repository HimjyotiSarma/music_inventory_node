import pg from 'pg'

class Pool {
  __pool = null

  connect(options) {
    this.__pool = new pg.Pool(options)
    return this.__pool.query('SELECT 1+1')
  }

  close() {
    this.__pool?.end()
  }

  query(sql, params = []) {
    if (!this.__pool) {
      throw new Error('Pool NOT connected')
    }
    this.__pool.query(sql, params)
  }
}

export default new Pool()
