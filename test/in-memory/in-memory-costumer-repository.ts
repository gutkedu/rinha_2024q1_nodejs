import { BalanceEntity } from '@/core/entities/balance'
import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '@/repositories/costumer-repository'

export class InMemoryCostumerRepository implements CostumerRepository {
  public costumerItems: CostumerEntity[] = []
  public balanceItems: BalanceEntity[] = []

  constructor() {
    this.costumerItems = [
      CostumerEntity.create({ id: 1, limit: 100000, name: 'João' }),
      CostumerEntity.create({ id: 2, limit: 80000, name: 'José' }),
      CostumerEntity.create({ id: 3, limit: 1000000, name: 'Maria' }),
      CostumerEntity.create({ id: 4, limit: 10000000, name: 'João' }),
      CostumerEntity.create({ id: 5, limit: 500000, name: 'Joana' }),
    ]
    this.balanceItems = [
      BalanceEntity.create({ costumerId: 1, id: 1, value: 0 }),
      BalanceEntity.create({ costumerId: 2, id: 2, value: 0 }),
      BalanceEntity.create({ costumerId: 3, id: 3, value: 0 }),
      BalanceEntity.create({ costumerId: 4, id: 4, value: 0 }),
      BalanceEntity.create({ costumerId: 5, id: 5, value: 0 }),
    ]
  }
  async findById(
    costumerId: number,
  ): Promise<{
    costumer: CostumerEntity | null
    balance: BalanceEntity | null
  }> {
    const costumer = this.costumerItems.find((item) => item.id === costumerId)
    const balance = this.balanceItems.find(
      (item) => item.costumerId === costumerId,
    )

    if (costumer && balance) {
      return { costumer, balance }
    }

    return { costumer: null, balance: null }
  }
}
