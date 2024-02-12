import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DB_HOST as string,
    port: parseInt(`${process.env.DB_PORT || '5432'}`),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE as string,
  },
} satisfies Config
