import { TransactionType } from '@/core/types/transaction-type'
import { CostumerRepository } from '@/repositories/costumer-respository'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { NotFoundError } from './errors/not-found-error'
import { TransactionEntity } from '@/core/entities/transaction'
import { InconsistentBalanceError } from './errors/inconsistent-balance-error'
import { ulid } from 'ulid'

interface CreateCreditTxRequest {
  value: number
  description: string
  costumerId: string
}

interface CreateCreditTxResponse {
  limit: number
  balance: number
}

export class CreateCreditTxUseCase {
  constructor(
    private readonly costumerRepository: CostumerRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    costumerId,
    description,
    value,
  }: CreateCreditTxRequest): Promise<CreateCreditTxResponse> {
    const costumer = await this.costumerRepository.findById(costumerId)

    if (!costumer) {
      throw new NotFoundError('Costumer not found.')
    }

    const isInconsistentBalance = costumer.balance - value < -costumer.limit

    if (isInconsistentBalance) {
      throw new InconsistentBalanceError('Limit exceeded.')
    }

    const transaction = TransactionEntity.create({
      costumerId: costumer.id,
      description,
      transactionType: TransactionType.CREDIT,
      value,
      id: ulid(),
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
