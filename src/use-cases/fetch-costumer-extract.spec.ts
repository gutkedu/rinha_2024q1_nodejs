import { it, expect, beforeEach, describe } from 'vitest'
import { FetchCostumerExtractUseCase } from './fetch-costumer-extract'
import { TransactionType } from '@/core/types/transaction-type'
import { TransactionEntity } from '@/core/entities/transaction'
import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'

let transactionRepository: InMemoryTransactionRepository
let costumerRepository: InMemoryCostumerRepository
let sut: FetchCostumerExtractUseCase

describe('Fetch Costumer Extract', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    costumerRepository = new InMemoryCostumerRepository()
    sut = new FetchCostumerExtractUseCase(
      costumerRepository,
      transactionRepository,
    )
  })

  it('should fetch costumer extract', async () => {
    const costumer = await costumerRepository.findById('1')
    const value = 1000

    for (let i = 0; i < 15; i++) {
      transactionRepository.create(
        TransactionEntity.create({
          id: i,
          costumerId: costumer.id,
          description: 'Test',
          transactionType: TransactionType.DEBIT,
          value,
        }),
      )
      costumerRepository.items[0].balance += value
    }

    const { balance, lastTransactions } = await sut.execute({
      costumerId: '1',
    })

    expect(balance.total).toBe(costumer.balance)
    expect(balance.limit).toBe(costumer.limit)
    expect(lastTransactions.length).toBe(10)
  })

  it('should not fetch costumer extract when costumer is not found', async () => {
    await expect(
      sut.execute({
        costumerId: 'not-found',
      }),
    ).rejects.toThrow('Costumer not found.')
  })
})
