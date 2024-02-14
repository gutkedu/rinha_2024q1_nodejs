import { TransactionType } from '@/core/types/transaction-type'
import { NotFoundError } from './errors/not-found-error'
import { TransactionEntity } from '@/core/entities/transaction'
import { CostumerRepository } from '@/repositories/costumer-repository'
import { InconsistentBalanceError } from './errors/inconsistent-balance-error'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { BalanceRepository } from '@/repositories/balance-repository'
import { DbTxRepository } from '@/repositories/db-tx-repository'

interface CreateDebitTxRequest {
  value: number
  description: string
  costumerId: number
}

interface CreateDebitTxResponse {
  limit: number
  balance: number
}

export class CreateDebitTxUseCase {
  constructor(
    private readonly costumerRepository: CostumerRepository,
    private readonly balanceRepository: BalanceRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly dbTxRepository: DbTxRepository,
  ) {}

  async execute({
    costumerId,
    description,
    value,
  }: CreateDebitTxRequest): Promise<CreateDebitTxResponse> {
    const { balance, costumer } =
      await this.costumerRepository.findById(costumerId)

    if (!costumer || !balance) {
      throw new NotFoundError('Costumer not found.')
    }

    const isInconsistentBalance = balance.value - value < -costumer.limit

    if (isInconsistentBalance) {
      throw new InconsistentBalanceError('Limit exceeded.')
    }

    const debitValue = -value

    const transaction = TransactionEntity.create({
      costumerId: costumer.id,
      description,
      transactionType: TransactionType.DEBIT,
      value: debitValue,
    })

    const newBalance = balance.value - value

    await this.dbTxRepository.createTxAndUpdateCostumerBalance({
      costumerId: costumer.id,
      tx: transaction,
      balanceValue: newBalance,
    })

    /*     await this.transactionRepository.create(transaction)

    await this.balanceRepository.updateBalanceByCostumerId(
      costumer.id,
      newBalance,
    ) */

    return {
      limit: costumer.limit,
      balance: newBalance,
    }
  }
}
