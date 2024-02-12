import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { env } from '@/env'

const pool = new pg.Pool({
  host: env.DB_HOST,
  port: parseInt(`${env.DB_PORT || '5432'}`),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})

export const db = drizzle(pool)
