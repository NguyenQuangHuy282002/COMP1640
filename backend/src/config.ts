import * as dotenv from 'dotenv'
import * as path from 'path'

export async function ReadConfig() {
  dotenv.config()
  const resolvedir = (dir: any) => (dir ? path.resolve(process.cwd(), dir) : undefined)
  const config = {
    server: {
      port: typeof process.env.PORT === 'number' ? process.env.PORT : 8080,
    },
    database: {
      db_url: process.env.DB_URL,
      db_name: process.env.DB_NAME,
    },
    app: {
      dir: resolvedir('../frontend/build'),
    },
  }
  Object.defineProperty(config.database, 'db_url', {
    enumerable: false,
  })
  return config
}
