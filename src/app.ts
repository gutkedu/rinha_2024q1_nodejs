import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { transactionRoutes } from './http/controllers/routes'
import { startDatabase } from './lib/drizzle'
import { InconsistentBalanceError } from './use-cases/errors/inconsistent-balance-error'
import { NotFoundError } from './use-cases/errors/not-found-error'

export const app = fastify()

app.register(transactionRoutes)

export const { db, pool } = await startDatabase()

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (error instanceof InconsistentBalanceError) {
    return reply.status(422).send({
      message: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: error.message,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/newRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
