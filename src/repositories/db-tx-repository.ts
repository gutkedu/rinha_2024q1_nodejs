import { createTxAndUpdateCostumerBalanceDto } from './dtos/db-tx-dtos'

export interface DbTxRepository {
  createTxAndUpdateCostumerBalance(
    payload: createTxAndUpdateCostumerBalanceDto,
  ): Promise<void>
}
