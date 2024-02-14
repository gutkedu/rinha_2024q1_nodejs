import { BalanceSelect } from '@drizzle/schema/drizzle-schema'
import { Entity } from './entity'

interface BalanceProps extends BalanceSelect {}

export class BalanceEntity extends Entity<BalanceProps> {
  get id() {
    return this.props.id
  }

  get costumerId() {
    return this.props.costumerId
  }

  get value() {
    return this.props.value
  }

  set value(value: number) {
    this.props.value = value
  }

  static fromDatabase(input: BalanceSelect) {
    return new BalanceEntity(input)
  }

  static create(props: BalanceProps) {
    return new BalanceEntity({
      ...props,
    })
  }
}
