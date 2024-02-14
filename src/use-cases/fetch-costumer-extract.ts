import { TransactionRepository } from '@/repositories/transaction-repository'
import { NotFoundError } from './errors/not-found-error'
import { CostumerRepository } from '@/repositories/costumer-repository'

interface FetchCostumerExtractRequest {
  costumerId: number
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
    const { balance, costumer } =
      await this.costumerRepository.findById(costumerId)

    if (!costumer || !balance) {
      throw new NotFoundError('Costumer not found.')
    }

    const last10Transactions =
      await this.transactionRepository.findLast10TransactionsByCostumerId(
        costumer.id,
      )

    return {
      balance: {
        total: balance.value,
        extractDate: new Date().toISOString(),
        limit: costumer.limit,
      },
      lastTransactions: last10Transactions.map((transaction) => ({
        value: transaction.value as number,
        transactionType: transaction.transactionType as string,
        description: transaction.description as string,
        createdAt: transaction?.createdAt?.toISOString() as string,
      })),
    }
  }
}
