import { CostumerSelect } from '@drizzle/schema/drizzle-schema'
import { Entity } from './entity'
import { ulid } from 'ulid'

interface CostumerProps extends CostumerSelect {}

export class CostumerEntity extends Entity<CostumerProps> {
  get id() {
    return this.props.id
  }
  get limit() {
    return this.props.limit
  }

  set limit(limit: number) {
    this.props.limit = limit
  }

  get balance() {
    return this.props.balance
  }

  set balance(balance: number) {
    this.props.balance = balance
  }

  static create(props: CostumerProps) {
    return new CostumerEntity({
      ...props,
      id: props.id ?? ulid(),
    })
  }
}
