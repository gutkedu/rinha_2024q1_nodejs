import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '@/repositories/costumer-respository'

export class InMemoryCostumerRepository implements CostumerRepository {
  public items: CostumerEntity[] = []

  constructor() {
    this.items = [
      CostumerEntity.create({ limit: 100000, balance: 0 }, '1'),
      CostumerEntity.create({ limit: 80000, balance: 0 }, '2'),
      CostumerEntity.create({ limit: 1000000, balance: 0 }, '3'),
      CostumerEntity.create({ limit: 10000000, balance: 0 }, '4'),
      CostumerEntity.create({ limit: 500000, balance: 0 }, '5'),
    ]
  }
  async updateBalance(
    costumer: CostumerEntity,
    balance: number,
  ): Promise<CostumerEntity> {
    const findCostumer = this.items.find((item) => item.id === costumer.id)

    if (!findCostumer) {
      throw new Error('Costumer not found')
    }

    findCostumer.balance = findCostumer.balance + balance

    return costumer
  }

  async findById(costumerId: string): Promise<CostumerEntity> {
    return this.items.find((item) => item.id === costumerId) as CostumerEntity
  }
}
