import { TransactionType } from '@/core/types/transaction-type'
import { NotFoundError } from './errors/not-found-error'
import { TransactionEntity } from '@/core/entities/transaction'
import { CostumerRepository } from '@/repositories/costumer-repository'
import { BalanceRepository } from '@/repositories/balance-repository'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { DbTxRepository } from '@/repositories/db-tx-repository'

interface CreateCreditTxRequest {
  value: number
  description: string
  costumerId: number
}

interface CreateCreditTxResponse {
  limit: number
  balance: number
}

export class CreateCreditTxUseCase {
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
  }: CreateCreditTxRequest): Promise<CreateCreditTxResponse> {
    const { balance, costumer } =
      await this.costumerRepository.findById(costumerId)

    if (!costumer || !balance) {
      throw new NotFoundError('Costumer not found.')
    }

    const transaction = TransactionEntity.create({
      costumerId: costumer.id,
      description,
      transactionType: TransactionType.CREDIT,
      value,
    })

    const newBalance = balance.value + value

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
