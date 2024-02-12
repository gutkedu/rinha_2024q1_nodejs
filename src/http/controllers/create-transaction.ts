import { TransactionType } from '@/core/types/transaction-type'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

interface createTransactionOutput {
  limite: number
  saldo: number
}

export async function createTransactionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTransactionParamsSchema = z.object({
    id: z.string(),
  })

  const createTransactionBodySchema = z.object({
    valor: z.number(),
    tipo: z.nativeEnum(TransactionType),
    descricao: z.string(),
  })

  const { id: costumerId } = createTransactionParamsSchema.parse(request.params)
  const {
    valor: value,
    tipo: transactionType,
    descricao: description,
  } = createTransactionBodySchema.parse(request.body)

  const useCase = makeCreateTransactionUseCase()

  const { balance, limit } = await useCase.execute({
    costumerId,
    description,
    transactionType,
    value,
  })

  reply.status(200).send({
    saldo: balance,
    limite: limit,
  } as createTransactionOutput)
}
