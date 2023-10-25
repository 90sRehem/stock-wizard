import { Guid } from "@/core/value-objects";

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): Guid;
}