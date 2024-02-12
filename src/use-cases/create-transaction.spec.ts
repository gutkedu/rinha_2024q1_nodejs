import { it, expect, beforeEach, describe } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction'
import { TransactionType } from '@/core/types/transaction-type'
import { NotFoundError } from './errors/not-found-error'
import { InconsistentBalanceError } from './errors/inconsistent-balance-error'
import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'

let costumerRepository: InMemoryCostumerRepository
let transactionRepository: InMemoryTransactionRepository
let sut: CreateTransactionUseCase

describe('Create Transaction', () => {
  beforeEach(() => {
    costumerRepository = new InMemoryCostumerRepository()
    transactionRepository = new InMemoryTransactionRepository()
    sut = new CreateTransactionUseCase(
      costumerRepository,
      transactionRepository,
    )
  })

  it('should create a transaction', async () => {
    const response = await sut.execute({
      costumerId: '1',
      description: 'Test',
      transactionType: TransactionType.DEBIT,
      value: 1000,
    })

    const findCostumer = await costumerRepository.findById('1')

    expect(response.limit).toBe(findCostumer.limit)
    expect(response.balance).toBe(findCostumer.balance)
  })

  it('should not create a transaction when costumer is not found', async () => {
    await expect(
      sut.execute({
        costumerId: 'not-found',
        description: 'Test',
        transactionType: TransactionType.DEBIT,
        value: 1000,
      }),
    ).rejects.toThrow(NotFoundError)
  })

  it('should not create a transaction when balance is inconsistent', async () => {
    await expect(
      sut.execute({
        costumerId: '1',
        description: 'Test',
        transactionType: TransactionType.DEBIT,
        value: 999999999999,
      }),
    ).rejects.toThrow(InconsistentBalanceError)
  })
})
