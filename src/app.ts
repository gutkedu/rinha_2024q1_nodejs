import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { transactionRoutes } from './http/controllers/routes'
import { startDatabase } from './lib/drizzle'

export const app = fastify()

app.register(transactionRoutes)

export const db = await startDatabase()

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/newRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
