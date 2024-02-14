import { TransactionEntity } from '@/core/entities/transaction'

export interface createTxAndUpdateCostumerBalanceDto {
  balanceValue: number
  costumerId: number
  tx: TransactionEntity
}
