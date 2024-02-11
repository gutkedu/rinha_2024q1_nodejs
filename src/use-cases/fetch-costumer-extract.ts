import { CostumerRepository } from '@/repositories/costumer-respository'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { NotFoundError } from './errors/not-found-error'

interface FetchCostumerExtractRequest {
  costumerId: string
}

interface FetchCostumerExtractResponse {
  balance: {
    total: number
    extractDate: string
    limit: number
  }
  lastTransactions: {
    value: number
    transactionType: string
    description: string
    createdAt: string
  }[]
}

export class FetchCostumerExtractUseCase {
  constructor(
    private readonly costumerRepository: CostumerRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    costumerId,
  }: FetchCostumerExtractRequest): Promise<FetchCostumerExtractResponse> {
    const costumer = await this.costumerRepository.findById(costumerId)

    if (!costumer) {
      throw new NotFoundError('Costumer not found.')
    }

    const lastTransactions =
      await this.transactionRepository.findLast10TransactionsByCostumerId(
        costumerId,
      )

    return {
      balance: {
        total: costumer.balance,
        extractDate: new Date().toISOString(),
        limit: costumer.limit,
      },
      lastTransactions: lastTransactions.map((transaction) => ({
        value: transaction.value,
        transactionType: transaction.transactionType,
        description: transaction.description,
        createdAt: transaction.createdAt.toISOString(),
      })),
    }
  }
}
