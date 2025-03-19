/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(
    `
            CREATE TABLE IF NOT EXISTS categories(
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(400),
                img_url VARCHAR(250) NOT NULL
            );
            
            ALTER TABLE instrument
            ADD COLUMN category_id UUID REFERENCES categories(id);
        `
  )
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(
    `
            DROP TABLE IF EXISTS categories;

            ALTER TABLE instrument
            DROP COLUMN IF EXISTS category_id;
        `
  )
}
