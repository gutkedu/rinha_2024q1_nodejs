import { TransactionType } from '@/core/types/transaction-type'
import { Entity } from './entity'
import { Optional } from '../types/optional'

interface TransactionProps {
  value: number
  transactionType: TransactionType
  description: string
  costumerId: string
  createdAt: Date
}

export class TransactionEntity extends Entity<TransactionProps> {
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

  static create(props: Optional<TransactionProps, 'createdAt'>, id?: string) {
    return new TransactionEntity({ ...props, createdAt: new Date() }, id)
  }
}
