export interface BalanceRepository {
  updateBalanceByCostumerId(costumerId: number, value: number): Promise<void>
}
