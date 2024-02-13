import { Entity } from './entity'
import { Optional } from '../types/optional'
import { ulid } from 'ulid'
import { TransactionSelect } from '@drizzle/schema/drizzle-schema'

interface TransactionProps extends TransactionSelect {}

export class TransactionEntity extends Entity<TransactionProps> {
  get id() {
    return this.props.id
  }
  get value() {
    return this.props.value
  }

  get transactionType() {
    return this.props.transactionType
  }

  get description() {
    return this.props.description
  }

  get costumerId() {
    return this.props.costumerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static fromDatabase(input: TransactionSelect) {
    return new TransactionEntity(input)
  }

  static create(props: Optional<TransactionProps, 'createdAt'>) {
    return new TransactionEntity({
      ...props,
      id: props.id ?? ulid(),
      createdAt: props.createdAt ?? new Date(),
    })
  }
}
