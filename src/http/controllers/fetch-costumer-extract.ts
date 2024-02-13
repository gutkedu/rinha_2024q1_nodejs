import { TransactionType } from '@/core/types/transaction-type'
import { makeFetchCostumerExtractUseCase } from '@/use-cases/factories/make-fetch-costumer-extract'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

interface fetchCostumerExtractOutput {
  saldo: {
    total: number
    data_extrato: string
    limite: number
  }
  ultimas_transacoes: {
    valor: number
    tipo: TransactionType
    descricao: string
    realizada_em: string
  }[]
}

export async function fetchCostumerExtractController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchCostumerExtractParamsSchema = z.object({
    id: z.string(),
  })

  const { id: costumerId } = fetchCostumerExtractParamsSchema.parse(
    request.params,
  )

  const useCase = makeFetchCostumerExtractUseCase()

  const { balance, lastTransactions } = await useCase.execute({
    costumerId,
  })

  reply.status(200).send({
    saldo: {
      total: balance.total,
      data_extrato: balance.extractDate,
      limite: balance.limit,
    },
    ultimas_transacoes: lastTransactions.map((transaction) => {
      return {
        valor: transaction.value,
        tipo: transaction.transactionType,
        descricao: transaction.description,
        realizada_em: transaction.createdAt,
      }
    }),
  } as fetchCostumerExtractOutput)
}
