import { BalanceEntity } from '@/core/entities/balance'
import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '@/repositories/costumer-repository'

export class InMemoryCostumerRepository implements CostumerRepository {
  public items: CostumerEntity[] = []

  constructor() {
    this.items = [
      CostumerEntity.create({ id: 1, limit: 100000, name: 'João' }),
      CostumerEntity.create({ id: 2, limit: 80000, name: 'José' }),
      CostumerEntity.create({ id: 3, limit: 1000000, name: 'Maria' }),
      CostumerEntity.create({ id: 4, limit: 10000000, name: 'João' }),
      CostumerEntity.create({ id: 5, limit: 500000, name: 'Joana' }),
    ]
  }
  async findById(costumerId: number): Promise<{
    costumer: CostumerEntity | null
    balance: BalanceEntity | null
  }> {
    const costumer = this.items.find((c) => c.id === costumerId)
    const balance = BalanceEntity.create({
      costumerId,
      id: costumerId,
      value: 0,
    })

    if (!costumer) {
      return {
        costumer: null,
        balance: null,
      }
    }

    return {
      costumer,
      balance,
    }
  }
}
