import { FastifyInstance } from 'fastify'
import { createTransactionController } from './create-transaction'
import { fetchCostumerExtractController } from './fetch-costumer-extract'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/clientes/:id/extrato', fetchCostumerExtractController)

  app.post('/clientes/:id/transacoes', createTransactionController)
}
