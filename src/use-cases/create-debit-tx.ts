import { TransactionType } from '@/core/types/transaction-type'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { NotFoundError } from './errors/not-found-error'
import { TransactionEntity } from '@/core/entities/transaction'
import { ulid } from 'ulid'
import { CostumerRepository } from '@/repositories/costumer-repository'
import { InconsistentBalanceError } from './errors/inconsistent-balance-error'

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

    const isInconsistentBalance = costumer.balance - value < -costumer.limit

    if (isInconsistentBalance) {
      throw new InconsistentBalanceError('Limit exceeded.')
    }

    const debitValue = -value

    const transaction = TransactionEntity.create({
      costumerId: costumer.id,
      description,
      transactionType: TransactionType.DEBIT,
      value: debitValue,
      id: ulid(),
    })

    const newBalance = costumer.balance + debitValue

    await this.transactionRepository.createTransactionAndUpdateBalance(
      costumer.id,
      newBalance,
      transaction,
    )

    return {
      limit: costumer.limit,
      balance: newBalance,
    }
  }
}
