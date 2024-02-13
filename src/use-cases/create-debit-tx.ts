import { TransactionType } from '@/core/types/transaction-type'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { NotFoundError } from './errors/not-found-error'
import { TransactionEntity } from '@/core/entities/transaction'
import { ulid } from 'ulid'
import { CostumerRepository } from '@/repositories/costumer-repository'

interface CreateDebitTxRequest {
  value: number
  description: string
  costumerId: string
}

interface CreateDebitTxResponse {
  limit: number
  balance: number
}

export class CreateDebitTxUseCase {
  constructor(
    private readonly costumerRepository: CostumerRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    costumerId,
    description,
    value,
  }: CreateDebitTxRequest): Promise<CreateDebitTxResponse> {
    const costumer = await this.costumerRepository.findById(costumerId)

    if (!costumer) {
      throw new NotFoundError('Costumer not found.')
    }

    const transaction = TransactionEntity.create({
      costumerId: costumer.id,
      description,
      transactionType: TransactionType.DEBIT,
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
