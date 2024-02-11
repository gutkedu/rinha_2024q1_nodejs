import { TransactionType } from '@/core/types/transaction-type'
import { CostumerRepository } from '@/repositories/costumer-respository'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { NotFoundError } from './errors/not-found-error'
import { TransactionEntity } from '@/core/entities/transaction'
import { InconsistentBalanceError } from './errors/inconsistent-balance-error'

interface CreateTransactionRequest {
  value: number
  transactionType: TransactionType
  description: string
  costumerId: string
}

interface CreateTransactionResponse {
  limit: number
  balance: number
}

export class CreateTransactionUseCase {
  constructor(
    private readonly costumerRepository: CostumerRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    costumerId,
    description,
    transactionType,
    value,
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const costumer = await this.costumerRepository.findById(costumerId)

    if (!costumer) {
      throw new NotFoundError('Costumer not found.')
    }

    const isInconsistentBalance = costumer.balance - value < -costumer.limit

    if (isInconsistentBalance) {
      throw new InconsistentBalanceError('Limit exceeded.')
    }

    const transaction = TransactionEntity.create({
      costumerId,
      description,
      transactionType,
      value,
    })

    await Promise.all([
      this.transactionRepository.create(transaction),
      this.costumerRepository.updateBalance(costumer, value),
    ])

    return {
      limit: costumer.limit,
      balance: costumer.balance,
    }
  }
}
