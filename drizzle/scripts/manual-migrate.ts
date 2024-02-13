import fs from 'fs'
import path from 'path'
import { client } from './db'

console.log('Migrating...')

// Read all .sql files in the migrations directory
const migrationsDir = './drizzle/migrations'
let files = fs.readdirSync(migrationsDir)

// Sort the files array
files = files.sort()

for (const file of files) {
  if (path.extname(file) === '.sql') {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8')
    await client.query(sql)
  }
}

console.log('Migration finished successfully! ✅')
