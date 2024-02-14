import { TransactionType } from '@/core/types/transaction-type'
import { makeCreateCreditTxUseCase } from '@/use-cases/factories/make-credit-tx'
import { makeCreateDebitTxUseCase } from '@/use-cases/factories/make-debit-tx'
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
    id: z.coerce.number().nonnegative(),
  })

  const createTransactionBodySchema = z.object({
    valor: z.number().positive().int(),
    tipo: z.nativeEnum(TransactionType),
    descricao: z.string().min(1).max(10),
  })

  const { id: costumerId } = createTransactionParamsSchema.parse(request.params)
  const {
    valor: value,
    tipo: transactionType,
    descricao: description,
  } = createTransactionBodySchema.parse(request.body)

  if (transactionType === TransactionType.CREDIT) {
    const useCase = makeCreateCreditTxUseCase()

    const { balance, limit } = await useCase.execute({
      costumerId,
      description,
      value,
    })

    reply.status(200).send({
      saldo: balance,
      limite: limit,
    } as createTransactionOutput)
  } else if (transactionType === TransactionType.DEBIT) {
    const useCase = makeCreateDebitTxUseCase()

    const { balance, limit } = await useCase.execute({
      costumerId,
      description,
      value,
    })

    reply.status(200).send({
      saldo: balance,
      limite: limit,
    } as createTransactionOutput)
  } else {
    reply.status(400).send('Invalid transaction type.')
  }
}
